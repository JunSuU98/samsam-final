import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CSSelectDetail = ({memberId}) => {
    const { csNumber } = useParams();
    const [csDetail, setCsDetail] = useState({});
    const navigate = useNavigate()

    console.log("csNumber: " + csNumber);

    const fetchCsDetail = useCallback(async () => {
        try {
            const response = await axios.get(`/api/cs/select/${csNumber}`);
            setCsDetail(response.data);
        } catch (error) {
            console.error('Error fetching CS detail:', error);
        }
    }, [csNumber]);

    useEffect(() => {
        fetchCsDetail();
    }, [fetchCsDetail]);

    const handleDelete = async () => {
        const deleteConfirm= window.confirm("정말 삭제하시겠습니까?");

        if(deleteConfirm){
            try {
                const response = await axios.delete(`/api/cs/delete/${csNumber}`);
                setCsDetail(response.data);
                navigate(-1);
            } catch (error) {
                console.error('Error fetching CS detail:', error);
            }
        }

    }

    return (
        <div>
            <h1>samsamzo 고객 문의</h1>
            <h2>문의 상세</h2>
            <div>
                <p><strong>문의 제목:</strong> {csDetail.csTitle}</p>
                <p><strong>문의 일자:</strong> {csDetail.csDate ? csDetail.csDate.substring(0, 10) : ''}</p>
                <p><strong>문의 내용:</strong> {csDetail.csContent}</p>
                <p><strong>작성자:</strong> {csDetail.memberId}</p>
            </div>
            <div>
                <Link to="/cs">문의 목록</Link>

                {/* 로그인한 사람의 id 와 게시글을 작성한 작성자의 id 가 같아야만 수정과 삭제를 할 수 있다 */}
                { memberId === csDetail.memberId && 
                    <>
                        <Link to={`/cs/update/${csDetail.csNumber}`} state={{ csDetail }}>문의 수정</Link>
                        <Button variant="outline-danger" onClick={handleDelete}>문의 삭제</Button>{' '}
                    </>
                }
            </div>
        </div>
    );
};

export default CSSelectDetail;