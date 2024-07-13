import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import MemberHeader from '../../member/page/MemberHeader';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/App.css';

const CSSelectDetail = ({handleStorageChange, memberId}) => {
    const { csNumber } = useParams();
    const [csDetail, setCsDetail] = useState({});

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

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <div className='detail-line' style={{ display: 'flex', alignItems: 'center' }}>
                <h2 className='register-detail-text'>상세 내용</h2>
                {/* 로그인한 사람의 id 와 게시글을 작성한 작성자의 id 가 같아야만 수정과 삭제를 할 수 있다 */}
                { memberId === csDetail.memberId &&
                    <div className='cs-detail-btn'>
                        <Link to={`/cs/update/${csDetail.csNumber}`} state={{ csDetail }} className='btn cs-detail-toupdate'>수정</Link>
                        <Link to={`/cs/delete/${csDetail.csNumber}`} className='btn cs-detail-todelete'>삭제</Link>

                        <Link to={`/cs/update/${csDetail.csNumber}`} state={{ csDetail }} className='cs-detail-toupdate'>수정</Link>
                        <Link to={`/cs/delete/${csDetail.csNumber}`} className='cs-detail-todelete'>삭제</Link>

                    </div>
                }
            </div>

            <div className='cs-detail' style={{ display: 'flex', alignItems: 'center' }}>
                <p className='cs-detail-title' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 제목</strong>
                <div className='cs-detail-title-text'>
                    {csDetail.csTitle}
                </div></p>
                <p className='cs-detail-date' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 일자</strong>
                <div className='cs-detail-date-text'>
                    {csDetail.csDate ? csDetail.csDate.substring(0, 10) : ''}
                </div></p>
            </div>
            <div>
                <p className='cs-detail-content'><strong>문의 내용</strong>
                <div className='cs-detail-content-text'>{csDetail.csContent}</div></p>
            </div>
            <div className='cs-detail-to'>
                <Link to="/cs" className='btn cs-detail-toselect'>전체 목록</Link>
                <Link to="/cs" className='cs-detail-toselect'>전체 목록</Link>
            </div>

        </div>
    );
};

export default CSSelectDetail;