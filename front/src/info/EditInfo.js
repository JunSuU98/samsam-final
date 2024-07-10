import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditInfo = () => {
	const { infoNumber } = useParams();
	const [infoDetail, setInfoDetail] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		fetchInfoDetail();
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
			navigate(`/info/${infoNumber}`);
		} catch (error) {
			console.error('Error updating info:', error);
		}
	};

	const handleCancelEdit = () => {
		navigate(`/detail/${infoNumber}`);
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
				<button type="submit" className="btn btn-success">저장</button>
				<button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>취소</button>
			</form>
		</div>
	);
};

export default EditInfo;
