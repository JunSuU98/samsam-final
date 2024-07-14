import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoBackButton from "../component/button/GoBackButton";
import ToMainPageButton from "../component/button/ToMainPageButton";
import MemberHeader from "./MemberHeader";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function IdSearchPage({handleStorageChange, memberId}) {

    const [formData, setFormData] = useState({
        member_name: '',
        member_email: '',
        member_phone: ''
    });

    const [userId, setUserId] = useState(null);

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

        try{
            const response = await axios.post("/id-search", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // 회원 id 응답
            setUserId(response.data);
        } catch (error){
            alert("입력하신 정보의 회원을 찾을 수 없습니다");
            console.log('search error: ', error);
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
                            아이디 찾기
                        </h1>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center">

                <Col xs={6} >
                {userId === null ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nameInput">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" placeholder="이름을 입력하세요" name="member_name" value={formData.member_name} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="dateInput">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control type="email" name="member_email" value={formData.member_email} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phoneInput">
                                <Form.Label>전화번호</Form.Label>
                                <Form.Control type="text" placeholder="(-) 을 포함한 13자리 입력" value={formData.member_phone} name="member_phone" onChange={handleChange}/>
                            </Form.Group>

                            <Button type="submit" className="me-3">아이디 찾기</Button>
                            <GoBackButton text={"취소"}/>
                        </Form>

                    ) : (
                        <div>
                            <h1 className="mb-5">아이디: {userId}</h1>
                            <ToMainPageButton className="mt-5"/>
                        </div>
                    )

                }

                </Col>
                </Row>
            </Container>

        </div>
    );

}

export default IdSearchPage;