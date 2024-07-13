import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MemberHeader from '../../member/page/MemberHeader';

import '../../App.css';

const CSInsert = ({handleStorageChange, memberId}) => {
    const [csTitle, setCsTitle] = useState('');
    const [csContent, setCsContent] = useState('');
    const [csDate, setCsDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().substr(0, 10);
        setCsDate(today);
    }, []);

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
        
        try {
            const response = await axios.post('/api/cs/insert', {
                csTitle,
                csContent,
                csDate,
                memberId
            });
            console.log('Insert successful:', response.data);
            alert('입력하신 문의를 등록하였습니다.');           
            window.location.href = '/cs';
        } catch (error) {
            console.error('Error inserting inquiry:', error);
            alert('문의 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        navigate(`/`);
    };

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <h2 className='register-detail-text'>문의 등록</h2>
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
                        <button className='cs-update-submitbtn' type="submit">등록</button>
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
                        name="csDate"
                        value={csDate}
                    />
                </fieldset>

            </form>
            
            <div className='cs-update-to'>
                <Link to="/cs" className='btn cs-update-toselect'>전체 목록</Link>
            </div>
        </div>
    );
};

export default CSInsert;