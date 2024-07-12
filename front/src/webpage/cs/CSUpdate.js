import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MemberHeader from '../../member/page/MemberHeader';

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
        setCsTitle('');
        setCsContent('');
    };

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <h1>samsamzo 고객 문의</h1>
            <h2>문의 수정</h2>
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
                        value={csDate}
                        readOnly
                    />
                    <div>
                        <button type="submit">문의 수정</button>
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

export default CSUpdate;