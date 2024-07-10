import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InfoList = () => {
    const [infoList, setInfoList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [nowPage, setNowPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(5); // 페이지네이션의 시작과 끝 페이지 설정
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchInfoList();
    }, [nowPage, searchKeyword]);

    const fetchInfoList = async () => {
        try {
            const response = await axios.get(`/api/list?page=${nowPage - 1}&searchkeyword=${searchKeyword}`);
            const { content, totalPages } = response.data.list;

            // 페이지네이션의 시작과 끝 페이지 설정
            calculatePages(nowPage, totalPages);

            // 정렬된 데이터를 상태에 설정
            setInfoList(content);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching info list:', error);
        }
    };

    const calculatePages = (currentPage, total) => {
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(total, currentPage + 2);

        if (end - start + 1 < 5) {
            if (start === 1) {
                end = Math.min(total, start + 4);
            } else if (end === total) {
                start = Math.max(1, end - 4);
            }
        }

        setStartPage(start);
        setEndPage(end);
    };

    const handlePageClick = (pageNumber) => {
        setNowPage(pageNumber);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchInfoList();
    };

    return (
        <div className="container">
            <h1 className="text-center mt-4">
                <a href="/info-Main" style={{ textDecoration: 'none', color: 'inherit' }}>공지사항 목록</a>
            </h1>

            <table className="table table-bordered table-hover mt-4">
                <thead>
                    <tr className="text-center">
                        <th>공지 번호</th>
                        <th>공지 제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {infoList.length > 0 ? (
                        infoList.map(info => (
                            <tr key={info.infoNumber} className="text-center">
                                <td>{info.infoNumber}</td>
                                <td>
                                     <Link to={`/info/${info.infoNumber}`} className="btn btn-link">
                                        {info.infoTitle}
                                    </Link>
                                </td>
                                <td>{info.infoDate ? info.infoDate.substring(0, 10) : '날짜 정보 없음'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">등록된 공지사항이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 페이징 컴포넌트 */}
            <nav className="text-center" aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${nowPage === 1 && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClick(nowPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
                        <li key={pageNumber} className={`page-item ${nowPage === pageNumber && 'active'}`}>
                            <a className="page-link" href="#" onClick={() => handlePageClick(pageNumber)}>
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${nowPage === totalPages && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClick(nowPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* 검색 폼 */}
            <form onSubmit={handleSearch} className="form-inline mt-4 mb-4">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="searchkeyword" className="sr-only">Search</label>
                    <input type="text" className="form-control" id="searchkeyword" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="검색어 입력" />
                </div>
            </form>

            {/* 관리자로 로그인 했을 때만 보여지게 한다 */}
            { sessionStorage.getItem("member_id") === "admin" &&
                <div className="text-center mt-4">
                    <Link to="/info/insert" className="btn btn-primary">공지 등록하기</Link>
                </div>
            }
            
        </div>
    );
};

export default InfoList;
