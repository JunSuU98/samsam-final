import React, {useState} from "react";

import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import LoginModal from "../../member/modal/LoginModal";


function SellProductButton({memberId, handleStorageChange}) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    const navigate = useNavigate();

    const handleSelling = () => {

        // 만약 sessionStorage 에 member_id 가 없으면 (로그인이 아니면) LoginModal 을 띄운다
        if(memberId) { // 로그인 되어있는 경우
            navigate("/products/sell");
        } else {
            handleShow();
        }
        
    }

    return(
        <div style={{ display: 'inline' }}>
            <Button variant="outline-success" onClick={handleSelling}>판매하기</Button>{' '}
            <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange}/>
        </div>
    )

}

export default SellProductButton;