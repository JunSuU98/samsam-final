import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MemberHeader from '../../member/page/MemberHeader';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

const CSUpdate = ({handleStorageChange, memberId}) => {
    const { csNumber } = useParams();
    const navigate = useNavigate();
    const [csTitle, setCsTitle] = useState('');
    const [csContent, setCsContent] = useState('');
    const [csDate, setCsDate] = useState('');
    const [initialTitle, setInitialTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');

    useEffect(() => {
        const fetchCsDetail = async () => {
            try {
                const response = await axios.get(`/api/cs/select/${csNumber}`);
                const data = response.data;
                setCsTitle(data.csTitle);
                setCsContent(data.csContent);
                setCsDate(data.csDate.substring(0, 10));
                setInitialTitle(data.csTitle);
                setInitialContent(data.csContent);
            } catch (error) {
                console.error('Error fetching CS detail:', error);
            }
        };

        fetchCsDetail();
    }, [csNumber]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!csTitle.trim()) {
            alert('문의 제목을 입력해주세요.');
            return;
        }

        if (!csContent.trim()) {
            alert('문의 내용을 입력해주세요.');
            return;
        }

        if (csTitle === initialTitle && csContent === initialContent) {
            alert('문의 내용이 변경되지 않았습니다.');
            return;
        }

        try {
            const response = await axios.put(`/api/cs/update/${csNumber}`, {
                csTitle,
                csContent,
                csDate,
            });
            console.log('Update successful:', response.data);
            alert('문의가 성공적으로 수정되었습니다.');
            navigate('/cs');
        } catch (error) {
            console.error('Error updating inquiry:', error);
            alert('문의 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        navigate(`/cs/${csNumber}`);
    };

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <h2 className='register-detail-text'>문의 수정</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                        <div className='cs-update-all' style={{ display: 'flex', alignItems: 'center' }}>
                            <label className='cs-update-title' htmlFor="csTitle">문의 제목</label>
                            <input className='cs-update-title-text'
                                type="text"
                                id="csTitle"
                                value={csTitle}
                                onChange={(e) => setCsTitle(e.target.value)}
                                required
                            />
                        <div className='cs-update-btn'>
                            <button className='cs-update-canclebtn' type="button" onClick={handleCancel}>취소</button>
                            <button className='cs-update-submitbtn' type="submit">수정 완료</button>
                        </div>
                        </div>
                        <div className='cs-update-content'>
                            <label className='cs-update-content-title' htmlFor="csContent">문의 내용</label>
                            <textarea
                                id="csContent"
                                rows="5"
                                value={csContent}
                                onChange={(e) => setCsContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <input
                            type="hidden"
                            id="csDate"
                            value={csDate}
                            readOnly
                        />
                    </fieldset>
                    
                </form>

                <div className='cs-update-to'>
                    <Link to="/" className='btn cs-update-toselect'>전체 목록</Link>
                </div>
        </div>
    );
};

export default CSUpdate;