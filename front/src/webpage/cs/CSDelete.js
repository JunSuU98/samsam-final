import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MemberHeader from '../../member/page/MemberHeader';

import '../../App.css';

const CSSelectDetail = ({handleStorageChange, memberId}) => {
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
            navigate('/cs'); // 삭제 성공 시 목록 페이지로 이동
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            alert('문의 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        // Navigate back to inquiry detail page
        navigate(`/cs/${csNumber}`);
    };

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <div className='detail-line' style={{ display: 'flex', alignItems: 'center' }}>
                <h2 className='register-detail-text'>문의 삭제</h2>
                <div className='cs-delete-btn'>
                    <button type="button" onClick={handleCancel} className='cs-delete-canclebtn'>취소</button>
                    <button type="button" onClick={handleDelete} className='btn cs-delete'>삭제</button>
                    <button type="button" onClick={handleDelete} className=' cs-delete'>삭제</button>
                </div>
            </div>
            <div className='cs-detail' style={{ display: 'flex', alignItems: 'center' }}>
                <p className='cs-detail-title' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 제목</strong>
                <div className='cs-detail-title-text'>
                    {csDetail.csTitle}
                </div>
                </p>
            </div>
            <div>
                <p className='cs-detail-content'><strong>문의 내용</strong>
                    <div className='cs-detail-content-text'>{csDetail.csContent}</div></p>
            </div>
            <div className='cs-detail-to'>
                <Link to="/cs" className='btn cs-detail-toselect'>전체 목록</Link>
            </div>


        </div>
    );
};

export default CSSelectDetail;