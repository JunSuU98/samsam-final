import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import LoginModal from "../../member/modal/LoginModal";


function ChatListButton({memberId, handleStorageChange, productData}){

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    // 채팅 핸들러 
    const handleChatRoom = async () => {
        // 로그인이 되어있지 않으면 로그인 모달창을 띄운다
        if(memberId === null) {
            handleShow();
            return;
        }

        navigate("/chat-rooms")
    };

    return(
        <div style={{ display: 'inline' }}>
            <Button variant="outline-primary" onClick={handleChatRoom}>
                채팅방 목록
            </Button>
            <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange} />
        </div>
    )
}


export default ChatListButton;