import React, {useState, useEffect} from "react";
import axios from "axios";


function NaverLoginButton() {

    const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URL;

    return (
        <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=asdkfjasdfhjkas`}>
            <img 
            src={process.env.PUBLIC_URL + "/naver_login.png"}
            style={{width: '200px', height: '60px'}}
            />
        </a>

    )

}

export default NaverLoginButton;