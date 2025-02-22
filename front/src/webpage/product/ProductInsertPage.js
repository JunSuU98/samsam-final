import React, {useState} from "react";

import MemberHeader from "../../member/page/MemberHeader";

import { Button, Form, Image, Row, Col } from 'react-bootstrap';

import GoBackButton from "../../member/component/button/GoBackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';

function ProductInsertPage({handleStorageChange, memberId}) {

    const DEFAULT_IMAGE_PATH = process.env.PUBLIC_URL + '/no_img.jpeg'; // public 폴더의 기본 이미지 경로

    const navigate = useNavigate();

    // form 용 데이터 (Product) 
    const [productFormData, setProductFormData] = useState({
        product_title: '',
        product_content: '',
        product_price: '',
        product_category: '',
        member_id: sessionStorage.getItem("member_id")
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ====== 유효성 검사
        if(!productFormData.product_title.trim()){
            alert("상품 제목을 입력해주세요");
            return
        }

        if(!productFormData.product_content.trim()){
            alert("상품 설명을 입력해주세요");
            return
        }

        if(!productFormData.product_category.trim()){
            alert("카테고리를 선택해주세요");
            return
        }


        
        try {
            // 상품 정보를 insert 한다
            const productResponse = await axios.post("/api/products/addProduct", productFormData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // 응답에서 productNumber를 받는다
            const productNumber = productResponse.data.productNumber;

            // productNumber를 포함하여 이미지 데이터를 제출한다 
            const formData = new FormData();

            formData.append("productNumber", productNumber);
                // 이미지가 선택되지 않은 경우 public 폴더의 기본 이미지 추가
                if (selectedFiles.length === 0) {
                    const defaultFile = new File([await fetch(DEFAULT_IMAGE_PATH).then(res => res.blob())], 'no_img.jpeg', { type: 'image/jpeg' });
                    formData.append("images", defaultFile);
                } else {
                    selectedFiles.forEach(file => {
                        formData.append("images", file);
                    });
                }
            await axios.post("/api/img/insert", formData, {
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

            <Container>
                <Row className="d-flex justify-content-center mt-5 mb-5">
                    <Col xs={6}>

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

                            <Form.Select aria-label="Default select example" onChange={handleChange} name="product_category">
                                    <option>카테고리 선택</option>
                                    <option value="전자기기">전자기기</option>
                                    <option value="도서">도서</option>
                                    <option value="의류">의류</option>
                                    <option value="취미용품">취미용품</option>
                                    <option value="생활용품">생활용품</option>
                                    <option value="기타">기타</option>
                            </Form.Select>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>가격</Form.Label>
                                <Row>
                                    <Col sm={11}>
                                        <Form.Control type="number" name="product_price" id="product_price" value={productFormData.product_price} onChange={handleChange}/>
                                    </Col>
                                    <Col sm={1} className="mt-1">
                                        <h5>원</h5>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>설명</Form.Label>
                                <Form.Control as="textarea" rows={5} type="text" placeholder="상품 설명을 입력하세요" name="product_content" id="product_content" value={productFormData.product_content} onChange={handleChange}/>
                            </Form.Group>

                            <Button type="submit" className="me-5">상품 등록</Button>
                            <GoBackButton  text={"취소"}/>

                        </Form>

                    </Col>
                </Row>
            </Container>



        </div>
    )

}

export default ProductInsertPage;