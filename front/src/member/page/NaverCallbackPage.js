import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";


function NaverCallbackPage({handleStorageChange}) {

    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const navigate = useNavigate();

    useEffect(() => {
        getResponse();
    }, [handleStorageChange]);

    const getResponse = async () => {
        try{
            const response = await axios.get(`/api/naver-login-callback?code=${code}&state=${state}`);
            console.log(response.data)

            // 기존에 sessionStorage 에 남아있던 값 삭제
            sessionStorage.clear();

            const birth = response.data.naverResponseVO.birthyear + "-" + response.data.naverResponseVO.birthday;

            // sessionStorage에 사용자 정보 저장 
            sessionStorage.setItem("member_sns_session",response.data.naverResponseVO.id);
            sessionStorage.setItem("member_id",response.data.naverResponseVO.nickname);
            sessionStorage.setItem("member_name",response.data.naverResponseVO.name);
            sessionStorage.setItem("member_email", response.data.naverResponseVO.email);
            sessionStorage.setItem("member_birth", birth);
            sessionStorage.setItem("member_phone",response.data.naverResponseVO.mobile);
            sessionStorage.setItem("member_status", "active");

            sessionStorage.setItem("naver_accessToken", response.data.accessToken);
            sessionStorage.setItem("naver_refreshToken", response.data.refreshToken);


            // 실제 DB 에 사용자 정보 저장
            try {
                await axios.post("/join", {
                    member_id: response.data.naverResponseVO.nickname,
                    member_name: response.data.naverResponseVO.name,
                    member_birth: birth,
                    member_email: response.data.naverResponseVO.email,
                    member_phone: response.data.naverResponseVO.mobile
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.log("sns 회원 정보 DB 저장 오류: ", error);
            }


            handleStorageChange();

        } catch (error) {
            console.log("api error= ", error)
        }

        navigate("/");
    }


}

export default NaverCallbackPage;