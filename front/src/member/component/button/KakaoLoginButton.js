import React, {useState, useEffect} from "react";
import axios from "axios";

function KakaoLoginButton() {

    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri= process.env.REACT_APP_KAKAO_REDIRECT_URI;

    return (
        <a href={`https://kauth.kakao.com/oauth/authorize?&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`}>
            <img 
            src={process.env.PUBLIC_URL + "/kakao_login.png"}
            style={{width: '200px', height: '60px'}}
            />
        </a>

    )

}

export default KakaoLoginButton;