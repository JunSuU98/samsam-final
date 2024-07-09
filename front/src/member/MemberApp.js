import React, {useState, useEffect} from "react";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from "./page/RootPage";
import MyPage from './page/MyPage';
import MemberUpdatePage from "./page/MemberUpdatePage";
import AdminPage from "./page/AdminPage";
import MemberJoinPage from "./page/MemberJoinPage";
import NaverCallbackPage from "./page/NaverCallbackPage";
import KakaoCallbackPage from "./page/KakaoCallbackPage";
import IdSearchPage from "./page/IdSearchPage";
import PwSearchPage from "./page/PwSearchPage";

function App() {

    const [memberId, setMemberID] = useState('null');

    // sessionStorage 의 변화에 맞게 memberId 를 수정한다
    const handleStorageChange = () => {
        const newMemberId = window.sessionStorage.getItem("member_id");
        setMemberID(newMemberId);
        console.log(newMemberId);
    };

    useEffect(() => {
        handleStorageChange();
    }, []);


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/members/:member_id",
            element: <MyPage />
        },
        {
            path: "/members/update/:member_id",
            element: <MemberUpdatePage />
        },
        {
            path: "/join",
            element: <MemberJoinPage />
        },
        {
            path: "/admin",
            element: <AdminPage />
        },
        {
            path: "/naver-login-callback",
            element: <NaverCallbackPage handleStorageChange={handleStorageChange}/>
        },
        {
            path: "/kakao-login-callback",
            element: <KakaoCallbackPage handleStorageChange={handleStorageChange}/>
        },
        {
            path: "/id-search-page",
            element: <IdSearchPage />
        },
        {
            path: "/pw-search-page",
            element: <PwSearchPage />
        },

    ]);

    return <RouterProvider router={router} />;
}

export default App;
