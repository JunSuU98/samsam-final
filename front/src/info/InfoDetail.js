import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Carousel from 'react-bootstrap/Carousel';


const InfoDetail = () => {
	const { infoNumber } = useParams();
	const [infoDetail, setInfoDetail] = useState(null);
	const [comments, setComments] = useState([]);
	const navigate = useNavigate();

    const [imgData, setImgData] = useState([]);


	useEffect(() => {
		fetchInfoDetail();
		fetchImgs();
		fetchComments();
	}, [infoNumber]);

	const fetchInfoDetail = async () => {
		try {
			const response = await axios.get(`/api/select/${infoNumber}`);
			setInfoDetail(response.data);

			
		} catch (error) {
			console.error('Error fetching info detail:', error);
		}
	};

	const fetchImgs = async () => {
		// 공지 번호와 일치하는 이미지들을 가져온다 
		console.log("fetch infoNumber: ", infoNumber)
		const imgResponse = await axios.get(`/api/img/select?info_number=${infoNumber}`);
		setImgData(imgResponse.data);
		console.log('image data: ', imgResponse.data)
	}

	const fetchComments = async () => {
		try {
			const response = await axios.get(`/api/comments?infoNumber=${infoNumber}`);
			setComments(response.data.comments);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	const handleEditClick = () => {
		navigate(`/info/update/${infoNumber}`);
	};

	const handleDeleteClick = async () => {
		if (window.confirm('정말로 삭제하시겠습니까?,복원이 불가능합니다.')) {
			try {
				const response = await axios.delete(`/api/delete/${infoNumber}`);
				console.log('공지사항 삭제 성공:', response.data);
				alert('삭제가 완료되었습니다.공지 사항 리스트로 돌아갑니다 ...');
				navigate('/info'); // 리스트 페이지로 이동
			} catch (error) {
				console.error('공지사항 삭제 실패:', error);
				alert('공지사항 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
			}
		}
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
			<div className="text-center">
				<h1>{infoDetail.infoTitle}</h1>
			</div>

			<div className="info-item mt-4">
				<h4>{infoDetail.infoTitle}</h4>
				<hr />
				{/* 이미지 보여주기 */}
				{/* react bootstrap Carousels 사용 이미지 띄우기 */}
				<Carousel style={{width: '20rem', height: 'auto'}} interval={null}>
					{imgData.map((img, index) => (
						<Carousel.Item key={index} >
							<img src={`/img/${img.imgUrl}`} style={{width: '20rem', height: '20rem', objectFit: 'contain'}}/>
						</Carousel.Item>
					))}
				</Carousel>


				<p>{infoDetail.infoContent}</p>
			</div>

			<div className="info-date">
				<p>{infoDetail.infoDate ? infoDetail.infoDate.substring(0, 10) : ''}</p>
			</div>

			<div className="row mt-4">
				<div className="col-md-4">
					<Link to="/info" className="btn btn-custom btn-block">공지 목록 보러 가기</Link>
				</div>

				{/* 관리자로 로그인 했을 때만 보인다 */}
				{ sessionStorage.getItem("member_id") === "admin" &&
					<div className="col-md-4">
						<button onClick={handleEditClick} className="btn btn-primary btn-block">수정</button>
						<button onClick={handleDeleteClick} className="btn btn-danger btn-block">삭제</button>
					</div>
				}
			</div>

			{/* 공지사항 댓글 입력 form */}
			<CommentForm infoNumber={infoNumber} fetchComments={fetchComments} />
			<CommentList comments={comments} fetchComments={fetchComments} />
		</div>
	);
};

export default InfoDetail;
