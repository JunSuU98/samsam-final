import React, {useState, useEffect} from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from "react-router-dom";
import GoBackButton from "../component/button/GoBackButton";
import MemberHeader from "./MemberHeader";

function MemberUpdatePage({handleStorageChange, memberId}){

    const {member_id} = useParams();
    const navigate = useNavigate();

    // form 데이터 
    const [formData, setFormData] = useState({
        member_id: '',
        member_password: '',
        member_name: '',
        member_email: '',
        member_phone: '',
        member_address: '',
        member_birth: '',
        
        member_update: new Date().toISOString().split('T')[0],

        member_rate: '',
        member_status: ''

    });


    // ====== form 기존 값 호출 로직
    useEffect(() => {
        loadMember();
    }, []);

    const loadMember = async () => {

        try{
            const response = await axios.get(`/members/${member_id}`);
            console.log(response.data);
            setFormData(prevState => ({
                ...prevState,
                member_id: response.data.memberId,
                member_password: response.data.memberPassword,
                member_name: response.data.memberName,
                member_email: response.data.memberEmail,
                member_phone: response.data.memberPhone,
                member_address: response.data.memberAddress,
                member_birth: response.data.memberBirth,
                member_rate: response.data.memberRate,
                member_status: response.data.memberStatus,
            }));

        } catch (error) {
            console.log('Select Detail Error: ', error);
        }
    }

    // ===== form submit

    // form 입력값 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target; // 구조분해 할당으로 이벤트가 일어난 (입력이나 변경이 일어난) input 의 name과 value 를 얻는다
        setFormData(prevState => ({
            ...prevState, // 객체에 전개 구문을 써서 기존 formData의 데이터를 모두 복사한다  
            [name]: value // 속성 계산명 문법을 사용해서 동적으로 객체의 속성을 생성하고 값을 넣는다
        }));

        
    }

    // form 제출 핸들러 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put(`/members/${member_id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error('서버오류: 회원 수정 실패');
            }

            alert('수정이 완료되었습니다');
            navigate(-1); // 뒤로가기 
        } catch (error) {
            console.log('Error: ', error);
            alert('서버 오류: 회원 정보 수정에 실패했습니다');
        }
        
    }

    
    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="text" name="member_id" id="member_id" value={formData.member_id} disabled/>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력" name="member_password" id="member_password" value={formData.member_password} onChange={handleChange}/>
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

            <Form.Group className="mb-3">
                <Form.Control type="hidden" name="member_update" id="member_update" value={formData.member_update}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="hidden" name="member_rate" id="member_rate" value={formData.member_rate}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="hidden" name="member_status" id="member_status" value={formData.member_status}/>
            </Form.Group>


            <Button type="submit">정보수정</Button>
            <GoBackButton text={"취소"}/>

        </Form>

        </div>
    )

}

export default MemberUpdatePage;