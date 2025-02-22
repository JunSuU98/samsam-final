import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ProductPaging from "./ProductPaging";
import ProductTable from "./ProductTable";



function PsearchFormTest({handleProductList, handleTotalPage, handleCurrentPage, handleFindData}){

    // 검색용 변수
    const [searchData, setSearchData] = useState({
        searchFilter: 'product_title',
        searchQuery: ''
    });

    // form 입력값 변경 핸들러 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // form submit 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        handleFindData(searchData);

        try{
            const response = await axios.get(`/api/products?page=1&size=10&searchFilter=${searchData.searchFilter}&searchQuery=${searchData.searchQuery}`);
            handleProductList(response.data.productList);
            handleTotalPage(response.data.totalPage);

        } catch (error){
            console.log('search error: ', error);
        }
        
    }


    return (

        <div className="psearchform-search">
            <Form onSubmit={handleSubmit} >
                
                <InputGroup className="mb-3 psearchform-search-input">

                    <Form.Select aria-label="Default select example" onChange={handleChange} name="searchFilter" className="psearchform-option">
                        <option value="product_title">제목</option>
                        <option value="product_content">내용</option>
                    </Form.Select>


                    <Form.Control
                    className="psearchform-input form-control"
                    placeholder="검색어를 입력하세요"
                    aria-label="searchInput"
                    aria-describedby="basic-addon2"
                    name="searchQuery"  
                    value={searchData.searchQuery}
                    onChange={handleChange}
                    style={{ flex: '1' }}
                    />
                    <Button variant="outline-secondary" id="button-addon2" type="submit"> 검색 </Button>
                </InputGroup>

            </Form>

        </div>

    );

}

export default PsearchFormTest;