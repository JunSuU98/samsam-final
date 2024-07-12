import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MemberHeader from "../member/page/MemberHeader";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PsearchFormTest from "../product/component/PsearchFormTest";
import PpagingTest from "../product/component/PpagingTest";

import ProductTable from "../product/component/ProductTable";

import ChatListButton from "../chat/component/ChatListButton";

function Root({handleStorageChange, memberId}){

    // 검색과 페이징에 필요한 데이터 변수
    const [productList, setProductList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [category, setCategory] = useState('전체');

    const [findData, setFindData] = useState({
        searchFilter: '',
        searchQuery: ''
    });

    const handleFindData = (newFindData) => {
        setFindData(newFindData);
    }

    const handleProductList = (newProductList) => {
        setProductList(newProductList);
    }

    const handleTotalPage = (newTotalPage) => {
        setTotalPage(newTotalPage);
    }

    const handleCurrentPage = (newCurrentPage) => {
        setCurrentPage(newCurrentPage);
    }

    const categorySearch = async (eventKey) => {
        const category  = encodeURIComponent(eventKey)

        console.log("categorySearch excute")
        if(eventKey === "전체"){
            // 전체 상품 조회 api 호출
            const response = await axios.get(`/api/products?page=${currentPage}&size=10&searchFilter=${findData.searchFilter}&searchQuery=${findData.searchQuery}`);
            setProductList(response.data.productList);
            setTotalPage(response.data.totalPage);
            setCurrentPage(response.data.currentPage);
            console.log("first: ", totalPage)
        } else {
            const response = await axios.get(`/api/products/category?page=${currentPage}&size=10&category=${category}`);
            setProductList(response.data.productList);
            setTotalPage(response.data.totalPage);
            setCurrentPage(response.data.currentPage);

            setCategory(category);

        }

    }

    useEffect(() => {
        // categorySearch("전체");
    }, []);

    return(

        <div>

            {/* MemberHeader */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            {/* 상품 검색창 컴포넌트 */}
            {/* 검색창 :  */}
            <PsearchFormTest handleProductList={handleProductList} 
                handleTotalPage={handleTotalPage}
                handleCurrentPage={handleCurrentPage}
                handleFindData={handleFindData}/>

            {/* 카테고리 선택 컴포넌트 */}
            <Tabs
                defaultActiveKey="전체"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                onSelect={categorySearch}
            >
                <Tab eventKey="전체" title="전체">
                    {/* <SearchForm /> */}
                </Tab>
                <Tab eventKey="전자기기" title="전자기기">
                </Tab>
                <Tab eventKey="도서" title="도서">
                </Tab>
                <Tab eventKey="의류" title="의류">
                </Tab>
                <Tab eventKey="취미" title="취미">
                </Tab>
                <Tab eventKey="생활용품" title="생활용품">
                </Tab>

            </Tabs>


            {/* 상품 전체 조회 테이블 컴포넌트 */}
            <ProductTable productList={productList}/>

            {/* 상품 페이징 컴포넌트 */}
            <PpagingTest totalPage={totalPage} setProductList={handleProductList} currentPage={currentPage} findData={findData} category={category}/>

            {/* 공지사항 조회 링크 */}
            <Link to={"/info"}>공지사항</Link>

            {/* 고객문의 조회 링크 */}
            <Link to={"/cs"} >고객문의</Link>

             {/* 채팅방 조회 */}
            <ChatListButton 
            handleStorageChange={handleStorageChange} 
                memberId={memberId} />
        </div>

    )
}

export default Root;