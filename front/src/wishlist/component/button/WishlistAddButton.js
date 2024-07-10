import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import LoginModal from "../../../member/modal/LoginModal";


function WishListAddButton({memberId, handleStorageChange, productNumber, checked, onHandleChecked}){

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    }, [])

    

    // 찜하기 핸들러 
    const handleWishlist = async () => {
        // 로그인이 되어있지 않으면 로그인 모달창을 띄운다
        if(memberId === null) {
            handleShow();
            return;
        }
        
        // 사용자의 찜 목록을 확인해서 이미 찜 되어있는 제품인지 확인한다 

        try{
            if(checked){
                // 찜 해제
                await axios.delete(`/api/wishlist/${productNumber}/${memberId}`);
            } else {
                // 찜 추가 
                await axios.post("/api/wishlist/add", {
                    "member_id": memberId,
                    "product_number": productNumber
                }, {
                    headers: {"Content-Type": "application/json"}
                });
            }

            onHandleChecked(!checked);

        } catch (error) {
            console.log("check error: ", error);
        }

    };


    return(
        <div style={{ display: 'inline' }}>
            <Button variant="outline-primary" onClick={handleWishlist}>
                {checked ? "찜해제" : "찜하기"}
            </Button>
            <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange} />
        </div>
    )
}


export default WishListAddButton;