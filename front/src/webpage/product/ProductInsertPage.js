import React, {useState} from "react";

import MemberHeader from "../../member/page/MemberHeader";

import { Button, Form, Image, Row, Col } from 'react-bootstrap';

import GoBackButton from "../../member/component/button/GoBackButton";
import axios from "axios";


function ProductSellPage({handleStorageChange, memberId}) {

    // form 용 데이터 (Product) 
    const [productFormData, setProductFormData] = useState({
        product_title: '',
        product_content: '',
        product_price: '',
        product_category: '',
        member_id: memberId
    });

    // form 입력 감지 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target; // 구조분해 할당으로 이벤트가 일어난 (입력이나 변경이 일어난) input 의 name과 value 를 얻는다
        setProductFormData(prevState => ({
            ...prevState, // 객체에 전개 구문을 써서 기존 formData의 데이터를 모두 복사한다  
            [name]: value // 속성 계산명 문법을 사용해서 동적으로 객체의 속성을 생성하고 값을 넣는다
        }));

        if (name === 'member_id'){ // id input 의 입력값이 변경될 때 idCheckResult 를 0 으로 초기화한다
            // setIdCheckResult(0);
        }
    }

    // 이미지용 배열 변수
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (selectedFiles.length + files.length > 10) {
            alert("최대 10개의 이미지만 업로드할 수 있습니다.");
        return;
        }
        const newFiles = files.map(file => ({
            file,
            previewURL: URL.createObjectURL(file),
        }));
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // 상품 정보를 insert 한다
            const productResponse = await axios.post("/api/products/addProduct", productFormData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // 응답에서 productNumber를 받는다
            const productNumber = productResponse.data.productNumber;
            console.log("product number !!! ",productNumber);

            // productNumber를 포함하여 이미지 데이터를 제출한다 
            const formData = new FormData();

            formData.append("productNumber", productNumber);

            selectedFiles.forEach(file => {
                formData.append("images", file);
            });

            console.log("form data!!! " , formData);

            await axios.post("/img/insert", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            // 상품 상세 페이지로 이동
            // window.location.href = `/product/${productNumber}`;

        } catch (error) {
            console.error("상품 및 이미지 업로드 중 오류 발생", error);
        }
    };



    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
    };



    return(
        <div>

            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            {/* 판매 본문 form */}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* 이미지 파일 업로드 */}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>이미지 파일 선택 (최대 10개)</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={handleFileChange} 
                        multiple 
                        accept="image/*"
                    />
                </Form.Group>

                <Row>
                {selectedFiles.map((file, index) => (
                    <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                    <div className="position-relative">
                        <Image src={file.previewURL} thumbnail />
                        <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0"
                        onClick={() => handleRemoveFile(index)}
                        >
                        X
                        </Button>
                    </div>
                    </Col>
                ))}
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>상품명</Form.Label>
                    <Form.Control type="text" placeholder="상품명을 입력하세요" name="product_title" id="product_title" value={productFormData.product_title} onChange={handleChange}/>
                </Form.Group>

                <Form.Select aria-label="Default select example" onChange={handleChange} name="product_category">
                        <option>카테고리 선택</option>
                        <option value="전자기기">전자기기</option>
                        <option value="서적">서적</option>
                        <option value="의류">의류</option>
                        <option value="취미용품">취미용품</option>
                        <option value="생활용품">생활용품</option>
                </Form.Select>
                
                <Form.Group className="mb-3">
                    <Form.Label>가격</Form.Label>
                    <Form.Control type="text" name="product_price" id="product_price" value={productFormData.product_price} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>설명</Form.Label>
                    <Form.Control as="textarea" rows={5} type="text" placeholder="상품 설명을 입력하세요" name="product_content" id="product_content" value={productFormData.product_content} onChange={handleChange}/>
                </Form.Group>

                <Button type="submit">상품 등록</Button>
                <GoBackButton  text={"취소"}/>

            </Form>


        </div>
    )

}

export default ProductSellPage;