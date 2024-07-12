import React, {useState, useEffect} from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import WishListAddButton from "../../wishlist/component/button/WishlistAddButton";
import MemberHeader from "../../member/page/MemberHeader";

import StartChatButton from "../../chat/component/StartChatButton";

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
            <p>카테고리: {productData.productCategory}</p>
            <p>상태: {productData.productStatus}</p>

            {/* 찜하기, 채팅하기 버튼 */}
            { sessionStorage.getItem("member_id") !== productData.memberId && 
                <>
                    <WishListAddButton 
                        handleStorageChange={handleStorageChange} 
                        memberId={memberId} 
                        productNumber={productNumber}
                        checked={checked}
                        onHandleChecked={handleCheckChange}/>
                    
                    <StartChatButton 
                        handleStorageChange={handleStorageChange} 
                        memberId={memberId} 
                        productNumber={productNumber}
                        checked={checked}
                        onHandleChecked={handleCheckChange}
                        productData={productData}/>
                </>
            }

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