import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Image, Row, Col } from 'react-bootstrap';

const EditInfo = () => {
	const { infoNumber } = useParams();
	const [infoDetail, setInfoDetail] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');

	// 이미지용 배열 변수
    const [selectedFiles, setSelectedFiles] = useState([]); // 실제 이미지 파일 배열
    const [previewURLs, setPreviewURLs] = useState([]); // 이미지 미리보기 url 배열

	const navigate = useNavigate();

	// ========== image

		const handleFileChange = (event) => {

			const files = Array.from(event.target.files);

			if (selectedFiles.length + files.length > 10) {
				alert("최대 10개의 이미지만 업로드할 수 있습니다.");
			return;
			}

			const newFiles = files.map(file => ({
				file,
				previewURL: URL.createObjectURL(file),
			}));

			setSelectedFiles(prevFiles => [...prevFiles, ...files]);
			setPreviewURLs(prevURLs => [...prevURLs, ...newFiles.map(file => file.previewURL)]);
		};

	// 기존의 이미지를 불러온다
    const loadImgs = async () => {
        const imgResponse = await axios.get(`/api/img/select?info_number=${infoNumber}`);
        
        const testArr = [];

        for(let i = 0; i < imgResponse.data.length; i++) {
            const byteArray = await axios.get(`/img/${imgResponse.data[i].imgUrl}`, {responseType: 'blob'});

            const mimeType = 'image/jpeg';
            const fileName = imgResponse.data[i].imgUrl;

            const blob = new Blob([byteArray.data], {type: mimeType});
            const newFile = new File([blob], fileName);

            testArr.push(newFile);
        }

        console.log("testArr: ", testArr);

        const newFiles = testArr.map(file => (
            {
                file,
                previewURLs: "/img/"+ file.name
            }
        ));

        setSelectedFiles(prevFiles => [...prevFiles, ...testArr]);
        setPreviewURLs(prevURL => [...prevURL, ...newFiles.map(file => file.previewURLs)]);

    }

	// 사진 업로드 취소 핸들러
    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newURLs = previewURLs.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviewURLs(newURLs);
    };

	// =====================


	useEffect(() => {
		fetchInfoDetail();
		loadImgs();
	}, [infoNumber]);

	const fetchInfoDetail = async () => {
		try {
			const response = await axios.get(`/api/select/${infoNumber}`);
			setInfoDetail(response.data);
			setEditTitle(response.data.infoTitle);
			setEditContent(response.data.infoContent);
			

            ;
		} catch (error) {
			console.error('Error fetching info detail:', error);
		}
	};

	const handleSaveEdit = async (e) => {
		e.preventDefault();

		const today = new Date().toISOString().split('T')[0];

		try {
			await axios.put('/api/update', {
				infoNumber: infoNumber,
				infoTitle: editTitle,
				infoContent: editContent,
				infoDate: today
			});


			// ======== image update

			// productNumber를 포함하여 이미지 데이터를 제출한다 
            const formData = new FormData();

            formData.append("infoNumber", infoNumber);

            selectedFiles.forEach(file => {
                formData.append("images", file, file.name);
            });

            await axios.post("/api/img/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

			// =================

			navigate(`/info/${infoNumber}`);
		} catch (error) {
			console.error('Error updating info:', error);
		}
	};

	const handleCancelEdit = () => {
		navigate(`/info/${infoNumber}`);
	};

	if (!infoDetail) {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}



	return (
		<div className="container">
			<form onSubmit={handleSaveEdit} className="mt-4">
				<div className="form-group">
					<label htmlFor="editTitle">제목</label>
					<input
						type="text"
						className="form-control"
						id="editTitle"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="editContent">내용</label>
					<textarea
						className="form-control"
						id="editContent"
						value={editContent}
						onChange={(e) => setEditContent(e.target.value)}
					/>
				</div>

				{/* 기존 이미지 수정 */}
				<Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>이미지 파일 선택 (최대 10개)</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={handleFileChange} 
                        multiple 
                        accept="image/*"
                    />
                </Form.Group>

                <Row>
                {previewURLs.map((url, index) => (
                    <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                    <div className="position-relative">
                        {/* 이미지 보여주는 부분  */}
                        <Image src={url} thumbnail />
                        <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0"
                        onClick={() => handleRemoveFile(index)}
                        >
                        X
                        </Button>
                    </div>
                    </Col>
                ))}
                </Row>



				<button type="submit" className="btn btn-success">저장</button>
				<button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>취소</button>
			</form>
		</div>
	);
};

export default EditInfo;
