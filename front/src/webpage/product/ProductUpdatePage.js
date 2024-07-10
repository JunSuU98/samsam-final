import React, {useEffect, useState} from "react";

import MemberHeader from "../../member/page/MemberHeader";

import { Button, Form, Image, Row, Col } from 'react-bootstrap';

import GoBackButton from "../../member/component/button/GoBackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function ProductUpdatePage({handleStorageChange, memberId}) {

    const navigate = useNavigate();
    const {productNumber} = useParams();

    // form 용 데이터 (Product) 
    const [productFormData, setProductFormData] = useState({
        product_title: '',
        product_content: '',
        product_price: '',
        product_category: '',
        product_number: '',
    });

    // form 입력 감지 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target; // 구조분해 할당으로 이벤트가 일어난 (입력이나 변경이 일어난) input 의 name과 value 를 얻는다
        setProductFormData(prevState => ({
            ...prevState, // 객체에 전개 구문을 써서 기존 formData의 데이터를 모두 복사한다  
            [name]: value // 속성 계산명 문법을 사용해서 동적으로 객체의 속성을 생성하고 값을 넣는다
        }));

    }

    // 이미지용 배열 변수
    const [selectedFiles, setSelectedFiles] = useState([]); // 실제 이미지 파일 배열
    const [previewURLs, setPreviewURLs] = useState([]); // 이미지 미리보기 url 배열

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

        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        setPreviewURLs(prevURLs => [...prevURLs, ...newFiles.map(file => file.previewURL)]);
    };

    useEffect(() => {
        loadProduct();
        loadImgs();
    }, []);

    // 기존의 상품 정보를 불러와서 보여준다
    const loadProduct = async () => {

        const response = await axios.get(`/api/products/${productNumber}`);

        setProductFormData(prevData => ({
            ...prevData,
            product_title: response.data.productTitle,
            product_price: response.data.productPrice,
            product_content: response.data.productContent,
            product_number: response.data.productNumber,
            product_category: response.data.productCategory
        }));

        console.log("product form data: ", response.data)
    }

    // 기존의 이미지를 불러온다
    const loadImgs = async () => {
        const imgResponse = await axios.get(`/api/img/select?product_number=${productNumber}`);
        
        const testArr = [];

        for(let i = 0; i < imgResponse.data.length; i++) {
            const byteArray = await axios.get(`/img/${imgResponse.data[i].imgUrl}`, {responseType: 'blob'});

            const mimeType = 'image/jpeg';
            const fileName = imgResponse.data[i].imgUrl;

            const blob = new Blob([byteArray.data], {type: mimeType});
            const newFile = new File([blob], fileName);

            testArr.push(newFile);
        }

        console.log("testArr: ", testArr);

        const newFiles = testArr.map(file => (
            {
                file,
                previewURLs: "/img/"+ file.name
            }
        ));

        setSelectedFiles(prevFiles => [...prevFiles, ...testArr]);
        setPreviewURLs(prevURL => [...prevURL, ...newFiles.map(file => file.previewURLs)]);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

            // 상품 정보를 업데이트 한다
            const productResponse = await axios.put(`/api/products/${productNumber}`, productFormData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // productNumber를 포함하여 이미지 데이터를 제출한다 
            const formData = new FormData();

            formData.append("productNumber", productNumber);

            selectedFiles.forEach(file => {
                formData.append("images", file, file.name);
            });

            await axios.post("/api/img/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            
            // 상품 상세 페이지로 이동
            navigate(`/products/${productNumber}`);

        } catch (error) {
            console.error("상품 및 이미지 업로드 중 오류 발생", error);
        }
    };


    // 사진 업로드 취소 핸들러
    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newURLs = previewURLs.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviewURLs(newURLs);
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
                {previewURLs.map((url, index) => (
                    <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                    <div className="position-relative">
                        {/* 이미지 보여주는 부분  */}
                        <Image src={url} thumbnail />
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

                <Form.Select aria-label="Default select example" onChange={handleChange} name="product_category" value={productFormData.product_category}>
                        <option>카테고리 선택</option>
                        <option value="전자기기">전자기기</option>
                        <option value="서적">서적</option>
                        <option value="의류">의류</option>
                        <option value="취미용품">취미용품</option>
                        <option value="생활용품">생활용품</option>
                </Form.Select>

                <br/>

                <Form.Select aria-label="Default select example" onChange={handleChange} name="product_status" value={productFormData.product_status}>
                        <option>상태</option>
                        <option value="판매중">판매중</option>
                        <option value="예약중">예약중</option>
                        <option value="거래완료">거래완료</option>
                </Form.Select>
                
                <Form.Group className="mb-3">
                    <Form.Label>가격</Form.Label>
                    <Form.Control type="text" name="product_price" id="product_price" value={productFormData.product_price} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>설명</Form.Label>
                    <Form.Control as="textarea" rows={5} type="text" placeholder="상품 설명을 입력하세요" name="product_content" id="product_content" value={productFormData.product_content} onChange={handleChange}/>
                </Form.Group>

                <Button type="submit">상품 수정</Button>
                <GoBackButton  text={"취소"}/>

            </Form>


        </div>
    )

}

export default ProductUpdatePage;