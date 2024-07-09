import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function KakaoCallbackPage({handleStorageChange}){

    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get("code");
    
    const navigate = useNavigate();

    useEffect(() => {
        getResponse();
    }, [handleStorageChange]);

    const getResponse = async () => {
        try{
            const response = await axios.get(`/api/kakao-login-callback?code=${code}`);

            const birthday = response.data.kakao_account.birthday.replace(/(\d{2})(\d{2})/, "$1-$2");

            // 기존에 sessionStorage 에 남아있던 값 삭제
            sessionStorage.clear();

            const phone = response.data.kakao_account.phone_number.replace("+82 ", "0")

            // sessionStorage 에 사용자 정보 저장 
            sessionStorage.setItem("member_sns_session",response.data.id);
            sessionStorage.setItem("member_id",response.data.kakao_account.profile.nickname);
            sessionStorage.setItem("member_name",response.data.kakao_account.name);
            sessionStorage.setItem("member_email", response.data.kakao_account.email);
            sessionStorage.setItem("member_birth", response.data.kakao_account.birthyear + "-" + birthday);
            sessionStorage.setItem("member_phone", phone);
            sessionStorage.setItem("member_status", "active");

            // 실제 DB 에 사용자 정보 저장
            try {
                await axios.post("/join", {
                    member_id: response.data.kakao_account.profile.nickname,
                    member_name: response.data.kakao_account.name,
                    member_birth: response.data.kakao_account.birthyear + "-" + birthday,
                    member_email: response.data.kakao_account.email,
                    member_phone: phone
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

export default KakaoCallbackPage;