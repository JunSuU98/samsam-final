import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoBackButton from "../component/button/GoBackButton";
import ToMainPageButton from "../component/button/ToMainPageButton";
import MemberHeader from "./MemberHeader";

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
            console.log('search error: ', error);
        }
        
    }

    return (

        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>


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

                        <Button type="submit">아이디 찾기</Button>
                        <GoBackButton text={"취소"}/>
                    </Form>

                ) : (
                    <div>
                        <div>user id: {userId}</div>
                        <ToMainPageButton />
                    </div>
                )

            }

        </div>
    );

}

export default IdSearchPage;