import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CSInsert = ({memberId}) => {
    const [csTitle, setCsTitle] = useState('');
    const [csContent, setCsContent] = useState('');
    const [csDate, setCsDate] = useState('');

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
        setCsTitle('');
        setCsContent('');
    };

    return (
        <div>
            <h1>samsamzo 고객 문의</h1>
            <h2>문의 등록</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <div>
                        <label htmlFor="csTitle">문의 제목</label>
                        <input
                            type="text"
                            id="csTitle"
                            value={csTitle}
                            onChange={(e) => setCsTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="csContent">문의 내용</label>
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
                    <div>
                        <button type="submit">문의 등록</button>
                        <button type="button" onClick={handleCancel}>취소</button>
                    </div>
                </fieldset>
            </form>
            <div>
                <Link to="/cs">문의 목록</Link>
            </div>
        </div>
    );
};

export default CSInsert;