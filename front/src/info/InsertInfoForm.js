import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image, Row, Col } from 'react-bootstrap';

const InsertInfoForm = () => {
    const [infoTitle, setInfoTitle] = useState('');
    const [infoContent, setInfoContent] = useState('');
    const navigate = useNavigate();


    // ================= 이미지 업로드 !! 
    // 이미지용 배열 변수
    const [selectedFiles, setSelectedFiles] = useState([]); // 실제 이미지 파일 배열
    const [previewURLs, setPreviewURLs] = useState([]); // 이미지 미리보기 url 배열

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

        console.log("selectFiles: ", selectedFiles);
    };

    // 사진 업로드 취소 핸들러
    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newURLs = previewURLs.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviewURLs(newURLs);
    };
    // ================================ 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 yyyy-mm-dd 형식으로 가져옴
        
        try {
            const response = await axios.post('/api/insert', {
                infoTitle,
                infoContent,
                infoDate: today
            });

            // ===== 이미지 insert 요청 
            const infoNumber = response.data.infoNumber;

                // inoNumber 를 포함하여 이미지 데이터를 제출한다 
            const formData = new FormData();

            formData.append("infoNumber", infoNumber);

            selectedFiles.forEach(file => {
                formData.append("images", file);
            });

            await axios.post("/api/img/insert", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            // ======================

            console.log('Inserted info:', response.data); // 성공적으로 입력된 데이터 확인 (optional)

            // 입력 완료 메시지 보여주기 (이 부분은 상황에 맞게 수정 가능)
            alert('입력되었습니다');

            // 입력 후 목록 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error('Error inserting info:', error);
            // 오류 처리 로직 추가 가능
        }
    };

    return (
        <div className="container mt-4">
            <h2>공지사항 입력</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="infoTitle">공지 제목:</label>
                    <input
                        type="text"
                        id="infoTitle"
                        name="infoTitle"
                        className="form-control"
                        value={infoTitle}
                        onChange={(e) => setInfoTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="infoContent">공지 내용:</label>
                    <textarea
                        id="infoContent"
                        name="infoContent"
                        className="form-control"
                        rows="5"
                        value={infoContent}
                        onChange={(e) => setInfoContent(e.target.value)}
                        required
                    ></textarea>
                </div>


                {/* =========== 사진 입력 ============== */}
                {/* 이미지 파일 업로드 */}
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

                <button type="submit" className="btn btn-primary">
                    등록
                </button>
            </form>
        </div>
    );
};

export default InsertInfoForm;
