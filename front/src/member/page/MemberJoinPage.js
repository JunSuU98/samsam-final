import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MemberHeader from "./MemberHeader";

import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import LoginModal from "../modal/LoginModal";

import { FaCheck } from "react-icons/fa6";


function MemberJoinPage({handleStorageChange, memberId}){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    // 로그인하기 핸들러 
    const handleLogin = async () => {
        // 로그인이 되어있지 않으면 로그인 모달창을 띄운다
        if(memberId === null) {
            handleShow();
            return;
        }

        navigate("/")
    };


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

    const [idCheckMessage, setIdCheckMessage] = useState("");
    const [idCheckColor, setIdCheckColor] = useState("");


    // form 입력값 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target; // 구조분해 할당으로 이벤트가 일어난 (입력이나 변경이 일어난) input 의 name과 value 를 얻는다
        setFormData(prevState => ({
            ...prevState, // 객체에 전개 구문을 써서 기존 formData의 데이터를 모두 복사한다  
            [name]: value // 속성 계산명 문법을 사용해서 동적으로 객체의 속성을 생성하고 값을 넣는다
        }));

        if (name === 'member_id'){ // id input 의 입력값이 변경될 때 idCheckResult 를 0 으로 초기화한다
            setIdCheckResult(0);
            setIdCheckMessage("입력중...");
            setIdCheckColor("gray");
        }
    }

    // form 제출 핸들러 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ======== 유효성 검사 
        if(!formData.member_id.trim() || formData.member_id.length > 50){
            alert("아이디는 비어있거나 50자를 초과할 수 없습니다");
            return;
        }

        if(idCheckResult === 0){
            alert('아이디 중복 확인을 해주세요');
            return;
        }
        
        if(!formData.member_password.trim()){
                alert("비밀번호를 입력해주세요");
            return;
        }

        if(formData.member_password !== formData.confirm_password){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        if(!formData.member_name.trim()){
            alert("이름을 입력해주세요");
            return;
        }
        
        if(!formData.member_email.trim()){
            alert("이메일을 입력해주세요");
            return;
        }

        const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        
        if(!pattern.test(formData.member_phone)){
            alert("전화번호를 입력해주세요");
            return;
        }
        
        if(!formData.member_address.trim()){
            alert("주소를  입력해주세요");
            return;
        }

        const joinBirth = new Date(formData.member_birth);
        const joinBirthYear = joinBirth.getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - joinBirthYear;

        if(!formData.member_birth.trim()){
            alert("생년월일을 입력해주세요");
            return;
        }

        if(age < 8 || age > 90){
            alert("유효하지 않은 출생년도입니다.");
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
                setIdCheckMessage("사용 가능한 아이디입니다.");
                setIdCheckColor("green");
            } else { // 아이디 중복 확인을 실패한 경우
                setIdCheckResult(0);
                setIdCheckMessage("사용할 수 없는 아이디입니다.");
                setIdCheckColor("red");
            }
        } catch (error) {
            console.log('id check Error: ', error);
            setIdCheckMessage("사용할 수 없는 아이디입니다.");
            setIdCheckColor("red");
            setIdCheckResult(0);
        }

    }

    
    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <Container>
                <Row className="d-flex justify-content-center mt-5 mb-5">
                    <Col xs={5}>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Row>
                                    <Col>
                                        <Form.Label style={{fontWeight: 'bold'}}>아이디</Form.Label>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        {idCheckMessage && <div style={{ color: `${idCheckColor}` , display:'inline'}}>{idCheckMessage}</div>}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="아이디 입력" name="member_id" id="member_id" value={formData.member_id} onChange={handleChange} style={{ height: '45px' }}/>
                                    </Col>
                                    <Col sm={3}>
                                        { idCheckResult === 1 ?
                                            <Button id="id_check"  style={{ backgroundColor: '#21E6C1', color: 'white', borderColor: '#21E6C1', width: '100%', height: '45px', fontWeight:'bold'}}>
                                                <FaCheck style={{fontSize: '26px'}}/>
                                            </Button>                                           
                                            :
                                            <Button id="id_check" onClick={idCheck} value={0} style={{ backgroundColor: 'white', color: '#21E6C1', borderColor: '#21E6C1', width: '100%', height: '45px', fontWeight:'bold'}}>
                                                중복확인 
                                            </Button>
                                        }

                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호 입력" name="member_password" id="member_password" value={formData.member_password} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>비밀번호 재확인</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호 재입력" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>이름</Form.Label>
                                <Form.Control type="text" placeholder="이름 입력" name="member_name" id="member_name" value={formData.member_name} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>이메일</Form.Label>
                                <Form.Control type="email" placeholder="이메일 입력" name="member_email" id="member_email" value={formData.member_email} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>전화번호</Form.Label>
                                <Form.Control type="text" placeholder="전화번호 입력 ('-'포함 13자리 입력)" name="member_phone" id="member_phone" value={formData.member_phone} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>주소</Form.Label>
                                <Form.Control type="text" placeholder="주소 입력" name="member_address" id="member_address" value={formData.member_address} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{fontWeight: 'bold'}}>생년월일</Form.Label>
                                <Form.Control type="date" name="member_birth" id="member_birth" value={formData.member_birth} onChange={handleChange} style={{ height: '45px' }}/>
                            </Form.Group>

                            <Row>
                                <Col sm={4}>
                                    <Button style={{width:'100%', borderColor:'#7B7B7B', backgroundColor:'white', color:'#7B7B7B', fontWeight:'bold', fontSize:'20px', height:'50px'}} onClick={() => {navigate(-1)}}>취소 </Button>
                                </Col>
                                <Col sm={8}>
                                    <Button type="submit" style={{width: '100%', border: 'none', backgroundColor: '#21E6C1', fontWeight:'bold', fontSize:'20px', height:'50px'}}>회원가입</Button>
                                </Col>
                            </Row>

                            <Row className="mt-3 justify-content-end">
                                <Col xs="auto">
                                    <Link to={"/join"} className="login-modal-joinbtn" onClick={handleLogin} style={{ display: 'inline-block' }}> 로그인 하러가기 </Link>
                                    <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange}/>
                                </Col>
                            </Row>

                    </Form>

                    </Col>
                </Row>
            </Container>

        </div>
    )
}



export default MemberJoinPage;