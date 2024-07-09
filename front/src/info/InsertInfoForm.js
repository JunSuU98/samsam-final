import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsertInfoForm = () => {
    const [infoTitle, setInfoTitle] = useState('');
    const [infoContent, setInfoContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 yyyy-mm-dd 형식으로 가져옴
        
        try {
            const response = await axios.post('/api/insert', {
                infoTitle,
                infoContent,
                infoDate: today
            });

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

                <button type="submit" className="btn btn-primary">
                    등록
                </button>
            </form>
        </div>
    );
};

export default InsertInfoForm;
