import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoBackButton from "../component/button/GoBackButton";
import MemberHeader from "./MemberHeader";

import { useNavigate } from "react-router-dom";

function MemberJoinPage({handleStorageChange, memberId}){
    const navigate = useNavigate();

    // form 데이터 
    const [formData, setFormData] = useState({
        member_id: '',
        member_password: '',
        confirm_password: '',
        member_name: '',
        member_email: '',
        member_phone: '',
        member_address: '',
        member_birth: '',
        
    });

    // id 중복확인용 변수
    const [idCheckResult, setIdCheckResult] = useState(0);


    // form 입력값 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target; // 구조분해 할당으로 이벤트가 일어난 (입력이나 변경이 일어난) input 의 name과 value 를 얻는다
        setFormData(prevState => ({
            ...prevState, // 객체에 전개 구문을 써서 기존 formData의 데이터를 모두 복사한다  
            [name]: value // 속성 계산명 문법을 사용해서 동적으로 객체의 속성을 생성하고 값을 넣는다
        }));

        if (name === 'member_id'){ // id input 의 입력값이 변경될 때 idCheckResult 를 0 으로 초기화한다
            setIdCheckResult(0);
        }
    }

    // form 제출 핸들러 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(idCheckResult === 0){
            alert('아이디 중복 확인을 해주세요');
            return;
        }

        if(formData.member_password !== formData.confirm_password){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try{
            const response = await axios.post("/join", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error('서버오류: 회원 가입 실패');
            }

            alert('회원 가입이 완료되었습니다');
            navigate("/");
            

        } catch (error) {
            console.log('Error: ', error);
            alert('서버 오류: 회원 가입에 실패했습니다');
        }
        
    }

    // id 중복확인 핸들러 
    const idCheck = async () => {

        try{
            const response = await axios.get(`/id-check/${formData.member_id}`);
            if(response.data === 0){ // 아이디 중복 확인을 통과한 경우
                setIdCheckResult(1);
                alert("사용 가능한 아이디입니다.")
            } else { // 아이디 중복 확인을 실패한 경우
                setIdCheckResult(0);
                alert("사용할 수 없는 아이디입니다.")
            }
        } catch (error) {
            console.log('id check Error: ', error);
            setIdCheckResult(0);
        }

    }
    
    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>


        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="text" placeholder="아이디 입력" name="member_id" id="member_id" value={formData.member_id} onChange={handleChange}/>
                <Button id="id_check" onClick={idCheck} value={0}>중복확인</Button>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력" name="member_password" id="member_password" value={formData.member_password} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>비밀번호 재확인</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 재입력" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" placeholder="이름 입력" name="member_name" id="member_name" value={formData.member_name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일 입력" name="member_email" id="member_email" value={formData.member_email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>전화번호</Form.Label>
                <Form.Control type="text" placeholder="전화번호 입력 ('-'포함 13자리 입력)" name="member_phone" id="member_phone" value={formData.member_phone} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>주소</Form.Label>
                <Form.Control type="text" placeholder="주소 입력" name="member_address" id="member_address" value={formData.member_address} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>생년월일</Form.Label>
                <Form.Control type="date" name="member_birth" id="member_birth" value={formData.member_birth} onChange={handleChange}/>
            </Form.Group>

            <Button type="submit">회원가입</Button>
            <GoBackButton  text={"취소"}/>

        </Form>

        </div>
    )
}



export default MemberJoinPage;