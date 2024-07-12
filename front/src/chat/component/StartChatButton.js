import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import LoginModal from "../../member/modal/LoginModal";


function StartChatButton({memberId, handleStorageChange, productData}){

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    // 채팅 핸들러 
    const handleChat = async () => {
        // 로그인이 되어있지 않으면 로그인 모달창을 띄운다
        if(memberId === null) {
            handleShow();
            return;
        }

        // 로그인이 되어있으면 채팅방을 새롭게 만들고 채팅을 시작한다
        try{
            const inputBuyerId = sessionStorage.getItem('member_id');

            const response = await axios.post('/enter', {
				buyerId: inputBuyerId,
				sellerId: productData.memberId,
				roomTitle: productData.productTitle // 상품 제목을 채팅방 제목으로 설정
			});

			if (response.status === 201) {
				const roomId = response.data.roomId;
				navigate(`/chat-room/${roomId}`);
			} else {
				console.error('채팅방 생성 실패');
			}
        } catch (error) {
			console.error('채팅 시작 중 오류 발생:', error);
        }

        
    };


    return(
        <div style={{ display: 'inline' }}>
            <Button variant="outline-primary" onClick={handleChat}>
                채팅하기
            </Button>
            <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange} />
        </div>
    )
}


export default StartChatButton;