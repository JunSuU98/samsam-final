import React, {useState, useEffect} from "react";
import axios from "axios";

import Pagination from 'react-bootstrap/Pagination';

function Paging({ totalPage, searchFilter, searchQuery, setProductList }) {

    const [currentPage, setCurrentPage] = useState(1);

	// 컴포넌트가 처음 마운트될 때 회원 목록을 불러오는 useEffect 훅을 선언한다
	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async (pageNumber, searchFilter, searchQuery) => {
        try {
            let response;

            if (searchFilter == null || searchQuery == null) {
                response = await axios.get("/api/products");
            } else {
                response = await axios.get(`/api/products?page=${pageNumber}&size=5&searchFilter=${searchFilter}&searchQuery=${searchQuery}`);
            }
            setProductList(response.data.productList);
            setCurrentPage(response.data.currentPage);

            console.log(response.data);
        } catch (error) {
            alert('중고 상품이 없습니다');
            console.log(error.message);
        } 
		
	}

    let items = [];


    for(let pageNumber = 1; pageNumber <= totalPage; pageNumber++){
        items.push(

            <Pagination.Item key={pageNumber} onClick={() => loadProducts(pageNumber, searchFilter, searchQuery)} active={pageNumber === currentPage}> {pageNumber} </Pagination.Item>
        );
    }

    return(
        <div>

            <Pagination>

                {(currentPage - 1) > 0 &&  <Pagination.Prev onClick={() => loadProducts(currentPage - 1,  searchFilter, searchQuery)}/> }
                    {items}
                {(currentPage + 1) <= totalPage &&  <Pagination.Next onClick={() => loadProducts(currentPage + 1,  searchFilter, searchQuery)}/> }

            </Pagination>

        </div>
    )

}



export default Paging;