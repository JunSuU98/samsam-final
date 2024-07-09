import React, {useState, useEffect} from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';


function MemberDeleteButton(){

    const {member_id} = useParams();
    const navigate = useNavigate();

    // 회원 탈퇴 핸들러 
    const handleDelete = async () => {
        const confirmed = window.confirm("정말 탈퇴하시겠습니까?");

        if(confirmed) {
            try{
                await axios.delete(`/members/${member_id}`);
                navigate('/');
            } catch (error) {
                console.log("삭제 요청 실패: ", error);
            }
        };
    }


    return(
        <div style={{display: 'inline'}}>
            <Button variant="outline-danger" onClick={handleDelete}>회원탈퇴</Button>{' '}
        </div>
    )
}


export default MemberDeleteButton;