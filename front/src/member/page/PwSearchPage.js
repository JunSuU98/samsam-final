import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import GoBackButton from "../component/button/GoBackButton";
import { useNavigate } from "react-router-dom";
import MemberHeader from "./MemberHeader";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PwSearchPage({handleStorageChange, memberId}) {
    // form 진행 단계 상태
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    // 비밀번호 찾기 form 데이터 
    const [formData, setFormData] = useState({
        member_id: '',
        member_name: '',
        member_email: '',
        member_phone: '',
        member_password: '',
        confirm_password: ''
    });

    // form 입력값 변경 핸들러 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // form submit 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) { // 아이디, 이름, 이메일, 전화번호를 통해서 사용자가 비밀번호 변경 권한이 있는지 확인한다 
            try {
                const response = await axios.post("/pw-search", formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // 권한 확인 성공 시 다음 단계로 이동
                setStep(2);

            } catch (error) {
                alert("입력하신 정보의 회원을 찾을 수 없습니다")
                console.log('search error: ', error);
            }
        } else if (step === 2) {
            // 비밀번호와 비밀번호 확인이 일치하는지 확인
            if (formData.member_password !== formData.confirm_password) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            try {
                const response = await axios.put("/pw-update", {
                    member_id: formData.member_id,
                    member_password: formData.member_password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // 비밀번호 재설정 성공 시 alert 으로 알려주고 메인 화면으로 돌아간다 
                alert("비밀번호가 변경되었습니다.");
                navigate("/");

            } catch (error) {
                console.log('reset error: ', error);
            }
        }
        
    }

    return (

        <div>

            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <Container>

            <Row className="d-flex justify-content-center mt-5 mb-5">
                    <Col xs={6}> 
                        <h1
                            style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                            비밀번호 찾기
                        </h1>
                    </Col>
            </Row>


            <Row className="d-flex justify-content-center">
                <Col xs={6}>

                    <Form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <Form.Group className="mb-3" controlId="idInput">
                                    <Form.Label>아이디</Form.Label>
                                    <Form.Control type="text" placeholder="아이디를 입력하세요" name="member_id" value={formData.member_id} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="nameInput">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control type="text" placeholder="이름을 입력하세요" name="member_name" value={formData.member_name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="emailInput">
                                    <Form.Label>이메일</Form.Label>
                                    <Form.Control type="email" placeholder="이메일을 입력하세요" name="member_email" value={formData.member_email} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phoneInput">
                                    <Form.Label>전화번호</Form.Label>
                                    <Form.Control type="text" placeholder="(-) 을 포함한 13자리 입력" name="member_phone" value={formData.member_phone} onChange={handleChange} />
                                </Form.Group>

                                <Button type="submit" className="me-5">비밀번호 찾기</Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Form.Group className="mb-3" controlId="newPasswordInput">
                                    <Form.Label>새 비밀번호</Form.Label>
                                    <Form.Control type="password" placeholder="새 비밀번호를 입력하세요" name="member_password" value={formData.new_password} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="confirmPasswordInput">
                                    <Form.Label>비밀번호 확인</Form.Label>
                                    <Form.Control type="password" placeholder="비밀번호를 다시 입력하세요" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                                </Form.Group>

                                <Button type="submit" className="me-5">비밀번호 재설정</Button>
                            </>
                        )}

                        <GoBackButton text={"취소"} />
                    </Form>

                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default PwSearchPage;