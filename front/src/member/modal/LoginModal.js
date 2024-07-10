import React, {useState, useEffect} from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import NaverLoginButton from "../component/button/NaverLoginButton";
import KakaoLoginButton from "../component/button/KakaoLoginButton";


function LoginModal({show, setShow, handleStorageChange}){

    // 로그인 모달용 변수 
    const handleClose = () => setShow(false);

    // 로그인용 변수
    const [loginData, setLoginData] = useState({
        member_id: '',
        member_password: ''
    });

    // 경로 이동용 변수 
    const navigate = useNavigate();


    // input 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }))

    }


    // form submit 핸들러 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("/login", loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);

            // sessionStorage 에 사용자 정보 저장 
            sessionStorage.setItem("member_session",response.data.member_id);
            sessionStorage.setItem("member_id",response.data.member_id);
            sessionStorage.setItem("member_name",response.data.member_name);
            sessionStorage.setItem("member_email", response.data.member_email);
            sessionStorage.setItem("member_birth", response.data.member_birth);
            sessionStorage.setItem("member_phone",response.data.member_phone);
            sessionStorage.setItem("member_status", response.data.member_status);
            sessionStorage.setItem("member_address", response.data.member_address);
            sessionStorage.setItem("member_rate", response.data.member_rate);
            sessionStorage.setItem("member_create", response.data.member_create);

            handleClose();
            handleStorageChange();

            // 모달창을 닫고 navigate 를 이용해서 메인 화면으로 돌아간다 
            // navigate("/");
            navigate(-1);

        } catch(error) {
            console.log("login error: ", error);
        }

    }

    return (

        <div style={{ display: 'inline'}}>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SamSam</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="idInput">
                            <Form.Control
                                type="text"
                                name="member_id"
                                placeholder="아이디"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordInput">
                            <Form.Control
                                type="password"
                                name="member_password"
                                placeholder="비밀번호"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit">로그인</Button>{' '}

                    </Form>

                    <Link to={"/id-search-page"}> 아이디 찾기 </Link>
                    <Link to={"/pw-search-page"}> 비밀번호 찾기 </Link>
                    <Link to={"/join"}> 회원가입 </Link>

                </Modal.Body>

                <Modal.Footer>
                    <NaverLoginButton />
                    <KakaoLoginButton />
                </Modal.Footer>
            </Modal>


        </div>

    )
    
}

export default LoginModal;