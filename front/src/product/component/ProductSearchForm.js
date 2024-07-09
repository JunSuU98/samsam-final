import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ProductPaging from "./ProductPaging";
import ProductTable from "./ProductTable";



function SearchForm(){

    // 페이징 처리용 변수
    const [productList, setProductList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    // 검색용 변수
    const [searchData, setSearchData] = useState({
        searchFilter: '',
        searchQuery: ''
    });

	// 컴포넌트가 처음 마운트될 때 회원 목록을 불러오는 useEffect 훅을 선언한다
	useEffect(() => {
		loadProducts();
	}, []);

    // 전체 정보 조회 
	const loadProducts = async () => {

        try {
            let response = await axios.get("/api/products");
            setProductList(response.data.productList);
            setTotalPage(response.data.totalPage);

            console.log(response.data);
        } catch (error) {
            alert('중고 상품이 없습니다');
            console.log(error.message);
        } 
		
	}

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

        try{
            const response = await axios.get(`/api/products?page=1&size=10&searchFilter=${searchData.searchFilter}&searchQuery=${searchData.searchQuery}`);
            setProductList(response.data.productList);
            setTotalPage(response.data.totalPage);

        } catch (error){
            console.log('search error: ', error);
        }
        
    }


    return (

        <div>
            <Form onSubmit={handleSubmit}>
                
                <InputGroup className="mb-3">

                    <Form.Select aria-label="Default select example" onChange={handleChange} name="searchFilter">
                        <option>검색옵션</option>
                        <option value="product_title">제목</option>
                        <option value="product_content">내용</option>
                    </Form.Select>


                    <Form.Control
                    placeholder="검색어를 입력하세요"
                    aria-label="searchInput"
                    aria-describedby="basic-addon2"
                    name="searchQuery"  
                    value={searchData.searchQuery}
                    onChange={handleChange}
                    />
                    <Button variant="outline-secondary" id="button-addon2" type="submit"> 검색 </Button>
                </InputGroup>

            </Form>

            <ProductTable productList={productList}/>

            <ProductPaging totalPage={totalPage} searchFilter={searchData.searchFilter} searchQuery={searchData.searchQuery} setProductList={setProductList}/>

        </div>



    );

}

export default SearchForm;