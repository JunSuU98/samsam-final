import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import NaverLoginButton from "../component/button/NaverLoginButton";
import KakaoLoginButton from "../component/button/KakaoLoginButton";



function LoginModal({ show, setShow, handleStorageChange }) {

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
      const { name, value } = e.target;
      setLoginData(prevState => ({
         ...prevState,
         [name]: value
      }))

   }


   // form submit 핸들러 
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post("/login", loginData, {
            headers: {
               'Content-Type': 'application/json'
            }
         });

         console.log(response.data);

         // sessionStorage 에 사용자 정보 저장 
         sessionStorage.setItem("member_session", response.data.member_id);
         sessionStorage.setItem("member_id", response.data.member_id);
         sessionStorage.setItem("member_name", response.data.member_name);
         sessionStorage.setItem("member_email", response.data.member_email);
         sessionStorage.setItem("member_birth", response.data.member_birth);
         sessionStorage.setItem("member_phone", response.data.member_phone);
         sessionStorage.setItem("member_status", response.data.member_status);
         sessionStorage.setItem("member_address", response.data.member_address);
         sessionStorage.setItem("member_rate", response.data.member_rate);
         sessionStorage.setItem("member_create", response.data.member_create);

         handleClose();
         handleStorageChange();

         // 모달창을 닫고 navigate 를 이용해서 메인 화면으로 돌아간다 
         // navigate("/");
         navigate(-1);

      } catch (error) {
         console.log("login error: ", error);
      }

   }

   return (

      <div className="modal-container">

         <Modal show={show} onHide={handleClose} centered>
            <div className="login-modal-close">
               <Modal.Header closeButton>
               </Modal.Header>
            </div>
            <div style={{ textAlign: 'center' }}>
               <Modal.Title>
                  <div className="login-modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                     <img src="/samsamlogo.png" alt="Logo" style={{ width: '100px' }} />
                     <h1>SAMSAM</h1>
                  </div>
               </Modal.Title>
            </div>
            <Modal.Body>
               <div>
                  <Form className="login-modal-input" onSubmit={handleSubmit}>
                     <Form.Group className="mb-3 input-id" controlId="idInput">
                        <Form.Control
                           type="text"
                           name="member_id"
                           placeholder="아이디"
                           autoFocus
                           onChange={handleChange}
                        />
                     </Form.Group>

                     <Form.Group className="mb-3 input-password" controlId="passwordInput">
                        <Form.Control
                           type="password"
                           name="member_password"
                           placeholder="비밀번호"
                           onChange={handleChange}
                        />
                     </Form.Group>

                    <div>
                        <Button className="login-modal-loginbtn" variant="success" type="submit">로그인</Button>{' '}
                    </div>
                  </Form>
               </div>
                              <div className="login-modal-search" style={{ display: 'flex', alignItems: 'center' }}>
                  <Link to={"/id-search-page"} className="login-modal-searchid">아이디 찾기</Link>
                  <Link to={"/pw-search-page"} className="login-modal-searchpassword">비밀번호 찾기</Link>
                  <div className="login-modal-join">
                     <Link to={"/join"} className="login-modal-joinbtn"> 회원가입 </Link>
                  </div>
               </div>

            </Modal.Body>

            <div className="login-modal-sns">
               <div className="login-modal-sns-text">간편 로그인</div>
               <Modal.Footer>
               </Modal.Footer>
               </div>
               <div className="login-modal-snsbtn">
                  <NaverLoginButton/>
                  <KakaoLoginButton/>
            </div>
         </Modal>


      </div>

   )

}

export default LoginModal;