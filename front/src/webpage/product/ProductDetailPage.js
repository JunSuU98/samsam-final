import React, {useState, useEffect} from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import WishListAddButton from "../../wishlist/component/button/WishlistAddButton";
import MemberHeader from "../../member/page/MemberHeader";

import StartChatButton from "../../chat/component/StartChatButton";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductDetailPage({handleStorageChange, memberId}){

    const {productNumber} = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({});
    const [imgData, setImgData] = useState([]);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        loadProduct();
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {

            const wishlistResponse = await axios.get(`/api/wishlist/user/${memberId}`); // List-Wishlist
            const testArr = wishlistResponse.data.map(wish => wish['productNumber']);
            // 찜 목록에 현재 상품이 이미 있는지 확인
            await setChecked(testArr.includes(parseInt(productNumber)));

        } catch (error) {
            console.log("wishlist err: ", error );
        }
    }

    const handleCheckChange = (isChecked) => {
        setChecked(isChecked);
    }

    // 일부 조회 axios 요청
    const loadProduct = async () => {
        // 상품 정보를 가져온다
        const response = await axios.get(`/api/products/${productNumber}`);
        setProductData(response.data);

        // 상품 번호와 일치하는 이미지들을 가져온다
        const imgResponse = await axios.get(`/api/img/select?product_number=${productNumber}`);
        setImgData(imgResponse.data);
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("상품을 삭제하시겠습니까?");

        if(confirmed) {
            try{
                await axios.delete(`/api/products/${productNumber}`);
                navigate('/');
            } catch (error) {
                console.log("삭제 요청 실패: ", error);
            }
        };

    }

    return (
        <div>

            {/* 카테고리, 로그인, 검색창 헤더 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>



            <Container>
                <Row style={{margin:"2rem"}}>
                    <Col>
                        <h1>상품 개요</h1>
                    </Col>
                </Row>

                {/* 상품 개요용 컨테이너 */}

                <Row className="ms-5">
                    <Col>
                        {/* react bootstrap Carousels 사용 이미지 띄우기 */}
                        <Carousel style={{width: '20rem', height: '20rem'}} interval={null}>
                            {imgData.map((img, index) => (
                                <Carousel.Item key={index} >
                                    <img src={`/img/${img.imgUrl}`} style={{width: '20rem', height: '20rem', objectFit: 'contain'}}/>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                    </Col>

                    <Col>
                    {/* 개요용 col  */}
                        <Row>
                            <Col>
                                <h3>
                                    {productData.productTitle}
                                </h3>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <h1>
                                    {productData.productPrice} 원
                                </h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h5>
                                    {productData.memberId}
                                </h5>
                            </Col>
                        </Row>

                        <Row>
                                <Col>
                                <h6 style={{ color: 'gray' }}>
                                    {productData.productStatus}
                                </h6>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <hr/>
                            </Col>
                        </Row>

                        <Row>
                            {/* 찜하기, 채팅하기 버튼 */}
                            { sessionStorage.getItem("member_id") !== productData.memberId && 
                                <div className="d-flex">
                                    <div className="me-5 ms-0">
                                        <WishListAddButton 
                                            handleStorageChange={handleStorageChange} 
                                            memberId={memberId} 
                                            productNumber={productNumber}
                                            checked={checked}
                                            onHandleChecked={handleCheckChange}/>
                                    </div>
                                    
                                    <div>
                                        <StartChatButton 
                                            handleStorageChange={handleStorageChange} 
                                            memberId={memberId} 
                                            productNumber={productNumber}
                                            checked={checked}
                                            onHandleChecked={handleCheckChange}
                                            productData={productData}/>
                                    </div>

                                </div>
                            }

                            { memberId === productData.memberId &&
                                <div>
                                    <Link to={`/products/update/${productNumber}`} className="me-5">
                                        <Button>수정하기</Button>
                                    </Link>
                                    <Button onClick={handleDelete}>삭제하기</Button>
                                </div>
                            }

                        </Row>

                    </Col>
                </Row>

            </Container>

            <Container style={{marginLeft: "4rem"}}>

                <hr style={{
                    border: 'none',
                    height: '3px',
                    backgroundColor: 'black'
                }}/>
                <Row>
                    <Col>
                        <h1>상품 정보 </h1>
                        <hr />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p style={{ fontSize: '24px'}}>{productData.productContent}</p>
                    </Col>
                </Row>
            </Container>

        </div>
    )

}

export default ProductDetailPage;