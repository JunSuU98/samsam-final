import React, {useState, useEffect} from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";


function ProductDetailPage({memberId}){

    const {productNumber} = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({});
    const [imgData, setImgData] = useState([]);

    useEffect(() => {
        loadProduct();
    }, []);

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
        const confirmed = window.confirm("정말 삭제하시겠습니까?");

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

            {/* react bootstrap Carousels 사용 이미지 띄우기 */}
            <Carousel style={{width: '14rem', height: 'auto'}} interval={null}>
                {imgData.map((img, index) => (
                    <Carousel.Item key={index} >
                        <img src={`/img/${img.imgUrl}`} style={{width: '14rem', height: '14rem', objectFit: 'contain'}}/>
                    </Carousel.Item>
                ))}
            </Carousel>


            {/* 상품 정보 보여주기  */}
            <p>제목: {productData.productTitle}</p>
            <p>가격: {productData.productPrice}</p>
            <p>내용: {productData.productContent}</p>
            <p>판매자: {productData.memberId}</p>
            <p>상태: {productData.productStatus}</p>

            {/* 찜하기, 채팅하기 버튼 */}
            <Button>찜하기</Button>
            <Button>채팅하기</Button>

            { memberId === productData.memberId &&
                <div>
                    <Link to={`/products/update/${productNumber}`}>
                        <Button>수정하기</Button>
                    </Link>
                    <Button onClick={handleDelete}>삭제하기</Button>
                </div>
            }
            
        </div>
    )

}

export default ProductDetailPage;