import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/App.css';

import ToMainPageButton from '../../member/component/button/ToMainPageButton';
import MemberHeader from '../../member/page/MemberHeader';

const CSSelect = ({handleStorageChange, memberId}) => {
    const [inquiries, setInquiries] = useState([]);
    const [searchContent, setSearchContent] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useState({ searchContent: '', searchKeyword: '' });
    const [searched, setSearched] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0); // Define refreshKey here
    const [isClicked, setIsClicked] = useState(false); // 클릭할 때 색상 변경



    const handleSearchContentChange = (e) => {
        setSearchContent(e.target.value);
    };

    const handleSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim() === '') {
            alert('검색어를 입력하세요.');
            return;
        }
        setPage(1);
        setSearchParams({ searchContent, searchKeyword });
        setSearched(true);

        setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);

        setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
    };

    const handleReset = () => {
        setSearchContent('title');
        setSearchKeyword('');
        setSearchParams({ searchContent: '', searchKeyword: '' });
        setPage(1);
        setSearched(false);


        setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
    };

    // 마우스 눌렀을 때
    const handleMouseDown = () => {
        setIsClicked(true);
    };

    // 마우스 뗄 때
    const handleMouseUp = () => {
        setIsClicked(false);
        handleReset();
    };

    const fetchInquiries = useCallback(async () => {
        try {
            const response = await axios.get('/api/cs/select', {
                params: {
                    page,
                    searchContent: searchParams.searchContent,
                    searchKeyword: searchParams.searchKeyword,
                },
            });
            setInquiries(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    }, [page, searchParams]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.floor((page - 1) / 5) * 5 + 1;
        let endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    // const memberId = sessionStorage.getItem("member_id");

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <div>
                <h1>samsamzo 고객 문의</h1>
            </div>
            <section>
                <div>
                    <div>
                        <div>
                            <div>
                                <h2>문의 목록</h2>
                            </div>
                            <div>
                                <form onSubmit={handleSearch}>
                                    <div>
                                        <label htmlFor="searchContent">검색 기준</label>
                                        <select
                                            id="searchContent"
                                            value={searchContent}
                                            onChange={handleSearchContentChange}
                                        >
                                            <option value="title">제목</option>
                                            <option value="content">내용</option>
                                        </select>
                                        <input
                                            type="text"
                                            id="searchKeyword"
                                            placeholder="검색어를 입력하세요"
                                            value={searchKeyword}
                                            onChange={handleSearchKeywordChange}
                                        />
                                    </div>
                                    <button type="submit">검색</button>
                                </form>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>문의 번호</th>
                                            <th>문의 제목</th>
                                            <th>문의 일자</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inquiries.length > 0 ? (
                                            inquiries.map((item) => (
                                                <tr key={item.csNumber}>
                                                    <td>{item.csNumber}</td>
                                                    <td>{item.csTitle}</td>
                                                    <td>{item.csDate ? item.csDate.substring(0, 10) : ''}</td>
                                                    <td>
                                                        <Link to={`/cs/${item.csNumber}`}>
                                                            문의 상세 보기
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">검색 결과가 없습니다.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div>
                                    <ul>
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page <= 1}
                                            >
                                                이전
                                            </button>
                                        </li>
                                        {renderPageNumbers()}
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page >= totalPages}
                                            >
                                                다음
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    {/* 로그인 되어있는 상태에서만 문의등록 버튼이 보인다 */}
                                    {memberId && <Link to="/cs/insert">문의 등록</Link>}
                                    {searched && (
                                        <Link to="/" onClick={handleReset}>
                                            문의 목록
                                        </Link>
                                    )}
                                    <ToMainPageButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CSSelect;