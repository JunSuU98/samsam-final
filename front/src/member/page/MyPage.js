import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import ToMainPageButton from "../component/button/ToMainPageButton";
import MemberDeleteButton from "../component/button/MemberDeleteButton";
import ToUpdatePageButton from "../component/button/ToUpdatePageButton";

import GoBackButton from "../component/button/GoBackButton";

// 회원 상세 보기 
function MyPage(){

    const {member_id} = useParams();

    const [member, setMember] = useState({});


    useEffect(() => {
        loadMember();
    }, []);

    const loadMember = async () => {

        try{
            const response = await axios.get(`/members/${member_id}`);
            console.log(response.data);
            setMember(response.data);

            // 세션 스토리지에 데이터를 업데이트 한다 (데이터가 수정된 이후에 즉시 최신화하기 위함)
            sessionStorage.setItem("member_name", response.data.memberName);
            sessionStorage.setItem("member_status", response.data.memberStatus);
            sessionStorage.setItem("member_id", response.data.memberId);
            sessionStorage.setItem("member_email", response.data.memberEmail);
            sessionStorage.setItem("member_phone", response.data.memberPhone);
            sessionStorage.setItem("member_birth", response.data.memberBirth);
            if(response.data.memberAddress) {
                sessionStorage.setItem("member_address", response.data.memberAddress);
            }
            if(response.data.memberRate) {
                sessionStorage.setItem("member_rate", response.data.memberRate);
            }
            if(response.data.memberCreate) {
                sessionStorage.setItem("member_create", response.data.memberCreate);
            }

        } catch (error) {
            console.log('Select Detail Error: ', error);
        }
    }

    const memberSnsId = sessionStorage.getItem("member_sns_session");

    return(
        <div>
            <p>마이 페이지</p>
            <ListGroup>

                <ListGroup.Item>이름: {sessionStorage.getItem("member_name")}</ListGroup.Item>
                <ListGroup.Item>상태: {sessionStorage.getItem("member_status")}</ListGroup.Item>
                <ListGroup.Item>아이디: {sessionStorage.getItem("member_id")}</ListGroup.Item>
                <ListGroup.Item>이메일: {sessionStorage.getItem("member_email")} </ListGroup.Item>
                <ListGroup.Item>핸드폰: {sessionStorage.getItem("member_phone")} </ListGroup.Item>
                <ListGroup.Item>생년월일: {sessionStorage.getItem("member_birth")} </ListGroup.Item>

                {/* member_address, member_rate, member_create 가 없는 경우에는 보여주지 않는다 (SNS 로그인한 경우 ) */}
                {sessionStorage.getItem("member_address") !== null && (
                    <ListGroup.Item>주소: {sessionStorage.getItem("member_address")}</ListGroup.Item>
                )}
                {sessionStorage.getItem("member_rate") !== null && (
                    <ListGroup.Item>매너온도: {sessionStorage.getItem("member_rate")}</ListGroup.Item>
                )}
                {sessionStorage.getItem("member_create") !== null && (
                    <ListGroup.Item>가입일자: {sessionStorage.getItem("member_create")}</ListGroup.Item>
                )}

            </ListGroup>

            <ToMainPageButton/>

            {memberSnsId === null && (
                <>
                    <ToUpdatePageButton />
                    <MemberDeleteButton />
                </>
            )}

            <GoBackButton text={"이전"}/>
        </div>


    );
}

export default MyPage;