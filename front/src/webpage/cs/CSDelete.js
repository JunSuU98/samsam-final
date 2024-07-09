import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CSSelectDetail = () => {
    const { csNumber } = useParams();
    const navigate = useNavigate();
    const [csDetail, setCsDetail] = useState({});

    useEffect(() => {
        const fetchCsDetail = async () => {
            try {
                const response = await axios.get(`/api/cs/select/${csNumber}`);
                setCsDetail(response.data);
            } catch (error) {
                console.error('Error fetching CS detail:', error);
            }
        };

        fetchCsDetail();
    }, [csNumber]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/cs/delete/${csNumber}`);
            alert('해당 문의를 삭제했습니다.');
            navigate('/'); // 삭제 성공 시 목록 페이지로 이동
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            alert('문의 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        // Navigate back to inquiry detail page
        navigate(`/CSSelectDetail/${csNumber}`);
    };

    return (
        <div>
            <h1>samsamzo 고객 문의</h1>
			<h2>문의 삭제</h2>
            <div>
                <p><strong>문의 제목:</strong> {csDetail.csTitle}</p>
                <p><strong>문의 내용:</strong> {csDetail.csContent}</p>
            </div>
            <div>
                <button type="button" onClick={handleDelete}>문의 삭제</button>
                <button type="button" onClick={handleCancel} className="button">취소</button>
            </div>
			<div>
				<Link to="/" className="button">문의 목록</Link>
			</div>
        </div>
    );
};

export default CSSelectDetail;