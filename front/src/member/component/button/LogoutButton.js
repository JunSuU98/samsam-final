import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

function LogoutButton({handleStorageChange}){

    const navigate = useNavigate();

    // sessionStorage 에 저장했던 모든 정보들을 삭제한다 
    const handleLogout = async () => {

        try{
            // 네이버 로그인 api 를 사용해서 로그인한 경우
            if(sessionStorage.getItem("naver_accessToken")){
                await axios.post("/naver-logout", {
                    access_token: sessionStorage.getItem("naver_accessToken"),
                    refresh_token: sessionStorage.getItem("naver_refreshToken")
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            // 카카오 로그인 api 를 사용해서 로그인한 경우 
            if(sessionStorage.getItem("kakao_session")){
                await axios.get("/kakao-logout");
            }

        } catch (error) {
            console.log("logout error: ", error);
        }

        sessionStorage.clear();
        handleStorageChange();

        navigate("/");
    }

    return (
        <div style={{display: 'inline'}}>
            <Button variant="outline-danger" onClick={handleLogout}>로그아웃</Button>{' '}
        </div>
    )
}

export default LogoutButton;