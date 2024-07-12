import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import ToMainPageButton from "../component/button/ToMainPageButton";
import MemberDeleteButton from "../component/button/MemberDeleteButton";
import ToUpdatePageButton from "../component/button/ToUpdatePageButton";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table, Button, AccordionItem } from "react-bootstrap";


import GoBackButton from "../component/button/GoBackButton";
import MemberHeader from "./MemberHeader";
import { Link } from "react-router-dom";

import MyPageDeleteBtn from "../../webpage/component/MyPageDeleteBtn";

// 회원 상세 보기 
function MyPage({handleStorageChange, memberId}){

    const [member, setMember] = useState({});

    const [productList, setProductList] = useState([]);
    const [productImg, setProductImg] = useState([]); // 회원 판매 상품 이미지 

    const [wishlist, setWishlist] = useState([]);
    const [wishProducts, setWishProducts] = useState([]);
    const [wishlistImg, setWishlistImg] = useState([]); // 회원 찜한 상품 이미지

    const [cslist, setCslist] = useState([]);

    useEffect(() => {
        loadMember();
        loadProduct();
        loadWishlist();
        loadCS();
    }, [memberId]);

    const loadMember = async () => {

        try{
            const response = await axios.get(`/members/${memberId}`);

            // const response = await axios.get(`/members/${member_id}`);
            console.log(response.data);
            setMember(response.data);

            // 세션 스토리지에 데이터를 업데이트 한다 (데이터가 수정된 이후에 즉시 최신화하기 위함)
            sessionStorage.setItem("member_name", response.data.memberName);
            sessionStorage.setItem("member_status", response.data.memberStatus);
            sessionStorage.setItem("member_id", response.data.memberId);
            sessionStorage.setItem("member_email", response.data.memberEmail);
            sessionStorage.setItem("member_phone", response.data.memberPhone);
            sessionStorage.setItem("member_birth", response.data.memberBirth);
            if(response.data.memberAddress) {
                sessionStorage.setItem("member_address", response.data.memberAddress);
            }
            if(response.data.memberRate) {
                sessionStorage.setItem("member_rate", response.data.memberRate);
            }
            if(response.data.memberCreate) {
                sessionStorage.setItem("member_create", response.data.memberCreate);
            }

        } catch (error) {
            console.log('Select Detail Error: ', error);
        }
    }

    const memberSnsId = sessionStorage.getItem("member_sns_session");

    // 상품 정보 불러오기 
    const loadProduct = async () => {
        const productResponse = await axios.get(`/api/products/member?member_id=${memberId}`);
        setProductList(productResponse.data);
        loadProductImg(productResponse.data);
    }

    // 상품 사진 불러오기
    const loadProductImg = async (products) => {
        const promise = products.map(async (product) => {
            const imgResponse = await axios.get(`/api/img/select?product_number=${product.productNumber}`);
            const firstImgUrl = imgResponse.data[0].imgUrl;
            return {productNumber: product.productNumber, imgUrl: firstImgUrl};
        });

        // 상품에 대한 모든 이미지 요청이 끝나면 배열을 반환한다 
        const images = await Promise.all(promise);

        const imgMap = {};
        images.forEach(img => {
            imgMap[img.productNumber] = img.imgUrl;
        });

        setProductImg(imgMap);
    }

    // 찜 정보 불러오기
    const loadWishlist = async () => {
        const wishlistResposne = await axios.get(`/api/wishlist/user/${memberId}`);
        setWishlist(wishlistResposne.data);
        loadWishlistData(wishlistResposne.data);
    }

    // 찜 목록 데이터 불러오기 
    const loadWishlistData = async (wishlist) => {
        // 찜한 상품 정보 데이터 불러오기 (제목, 가격)
        const promise = wishlist.map(async (wish) => {
            const productResponse = await axios.get(`/api/products/${wish.productNumber}`);
            return {productNumber: wish.productNumber, productTitle: productResponse.data.productTitle , productPrice: productResponse.data.productPrice, }
        })

        // 찜한 상품 이미지 불러오기 (이미지)
        const products = await Promise.all(promise);
        const productMap = {};
        products.forEach(product => {
            productMap[product.productNumber] = product;
        })
        setWishProducts(productMap);

        const imgPromise = wishlist.map(async (wish) => {
            const imgResponse = await axios.get(`/api/img/select?product_number=${wish.productNumber}`);
            const firstImgUrl = imgResponse.data[0].imgUrl;
            return {productNumber: wish.productNumber, imgUrl: firstImgUrl};
        });

        const images = await Promise.all(imgPromise);

        const imgMap = {};
        images.forEach(img => {
            imgMap[img.productNumber] = img.imgUrl;
        });

        setWishlistImg(imgMap);

    }

    // 고객 문의 정보 불러오기
    const loadCS = async () => {
        const csResponse = await axios.get(`/api/cs/member?member_id=${memberId}`);
        setCslist(csResponse.data);
    }


    // ====== delete 실시간 반영 용 콜백 함수 
    const updateProductList = () => {
        loadProduct();
    };
    
    const updateWishlist = () => {
        loadWishlist();
    };
    
    const updateCsList = () => {
        loadCS();
    };

    const deleteAllWishlist = async () => {
        const confirmed = window.confirm("모든 찜을 삭제하시겠습니까?");

        if(confirmed) {
            try {
                await axios.delete(`/api/wishlist/user/${memberId}`);
            } catch (error) {
                console.log("delete all wishlist fail: ", error);
            }

            loadWishlist();
        }

    }

    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            {/* Tab 으로 회원의 전체 판매 상품, 전체 찜목록, 고객문의 불러오기 */}
            <Tabs
                defaultActiveKey="MyInfo"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="MyInfo" title="내 정보">
                    <ListGroup>

                        <ListGroup.Item>이름: {sessionStorage.getItem("member_name")}</ListGroup.Item>
                        <ListGroup.Item>상태: {sessionStorage.getItem("member_status")}</ListGroup.Item>
                        <ListGroup.Item>아이디: {sessionStorage.getItem("member_id")}</ListGroup.Item>
                        <ListGroup.Item>이메일: {sessionStorage.getItem("member_email")} </ListGroup.Item>
                        <ListGroup.Item>핸드폰: {sessionStorage.getItem("member_phone")} </ListGroup.Item>
                        <ListGroup.Item>생년월일: {sessionStorage.getItem("member_birth")} </ListGroup.Item>

                        {/* member_address, member_rate, member_create 가 없는 경우에는 보여주지 않는다 (SNS 로그인한 경우 ) */}
                        {sessionStorage.getItem("member_address") !== null && (
                            <ListGroup.Item>주소: {sessionStorage.getItem("member_address")}</ListGroup.Item>
                        )}
                        {sessionStorage.getItem("member_rate") !== null && (
                            <ListGroup.Item>매너온도: {sessionStorage.getItem("member_rate")}</ListGroup.Item>
                        )}
                        {sessionStorage.getItem("member_create") !== null && (
                            <ListGroup.Item>가입일자: {sessionStorage.getItem("member_create")}</ListGroup.Item>
                        )}

                    </ListGroup>

                    <ToMainPageButton/>

                    {memberSnsId === null && (
                        <>
                            <ToUpdatePageButton />
                            <MemberDeleteButton />
                        </>
                    )}

                    <GoBackButton text={"이전"}/>

                </Tab>

                <Tab eventKey="productlist" title="내 상품">

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>사진</th>
                                <th>제목</th>
                                <th>가격</th>
                                <th>날짜</th>
                                <th>상세보기</th>
                                <th>상품삭제</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* productList 데이터로 테이블을 만든다 */}
                            { productList.map(product => (
                                <tr key={product.productNumber}>
                                    <td><img src={"/img/" + productImg[product.productNumber]} style={{width: '80px', height: '80px'}}/></td>
                                    <td>{product.productTitle}</td>
                                    <td>{product.productPrice}</td>
                                    <td>{product.productUpdate}</td>
                                    <td>
                                        <Link to={`/products/${product.productNumber}`}>상세보기</Link>
                                    </td>
                                    <td><MyPageDeleteBtn text={"상품 삭제"} type={"product"} number={product.productNumber} updateList={updateProductList}/></td>
                                </tr>
                            ))}
                            </tbody>

                    </Table>

                </Tab>

                <Tab eventKey="wishlist" title="찜 목록">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>사진</th>
                                <th>제목</th>
                                <th>가격</th>
                                <th>찜한 날짜</th>
                                <th>상세보기</th>
                                <th><Button onClick={deleteAllWishlist}>모든 찜 삭제</Button></th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* productList 데이터로 테이블을 만든다 */}
                            { wishlist.map(wish => (
                                <tr key={wish.productNumber}>
                                    <td><img src={"/img/" + wishlistImg[wish.productNumber]} style={{width: '80px', height: '80px'}}/></td>
                                    <td>{wishProducts[wish.productNumber]?.productTitle}</td>
                                    <td>{wishProducts[wish.productNumber]?.productPrice}</td>
                                    <td>{wish.wishlistCreate}</td>
                                    <td>
                                        <Link to={`/products/${wish.productNumber}`}>상세보기</Link>
                                    </td>
                                    <td><MyPageDeleteBtn text={"찜 삭제"} type={"wishlist"} number={wish.productNumber} memberId={memberId} updateList={updateWishlist}/></td>
                                </tr>
                            ))}
                            </tbody>

                    </Table>
                </Tab>

                <Tab eventKey="cslist" title="문의 목록 ">
                    <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>제목</th>
                                        <th>내용</th>
                                        <th>날짜</th>
                                        <th>상세보기</th>
                                        <th>문의삭제</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* productList 데이터로 테이블을 만든다 */}
                                    { cslist.map(cs => (
                                        <tr key={cs.csNumber}>
                                            <td>{cs.csTitle}</td>
                                            <td>{cs.csContent}</td>
                                            <td>{cs.csDate}</td>
                                            <td>
                                                <Link to={`/cs/${cs.csNumber}`}>상세보기</Link>
                                            </td>
                                            <td><MyPageDeleteBtn text={"문의 삭제"} type={"cs"} number={cs.csNumber} updateList={updateCsList}/></td>
                                        </tr>
                                    ))}
                                    </tbody>

                            </Table>
                        </Tab>
                    
                </Tabs>

        </div>
    );
}

export default MyPage;