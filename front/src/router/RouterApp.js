import React, {useState, useEffect} from "react";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Member Page Import
import Root from "../webpage/RootPage";
import MyPage from '../member/page/MyPage';
import MemberUpdatePage from "../member/page/MemberUpdatePage";
import AdminPage from "../member/page/AdminPage";
import MemberJoinPage from "../member/page/MemberJoinPage";
import NaverCallbackPage from "../member/page/NaverCallbackPage";
import KakaoCallbackPage from "../member/page/KakaoCallbackPage";
import IdSearchPage from "../member/page/IdSearchPage";
import PwSearchPage from "../member/page/PwSearchPage";

// Product Page Import
import ProductInsertPage from "../webpage/product/ProductInsertPage";
import ProductUpdatePage from "../webpage/product/ProductUpdatePage";
import ProductDetailPage from "../webpage/product/ProductDetailPage";

// Cs Page Import
import CSSelect from "../webpage/cs/CSSelect";
import CSSelectDetail from "../webpage/cs/CSSelectDetail";
import CSInsert from "../webpage/cs/CSInsert";
import CSUpdate from "../webpage/cs/CSUpdate";
import CSDelete from "../webpage/cs/CSDelete";

// Info Page Import
import InfoInsert from "../webpage/info/InfoInsert";
import InfoSelect from "../webpage/info/InfoSelect";
import InfoUpdate from "../webpage/info/InfoUpdate";
import InfoSelectDetail from "../webpage/info/InfoSelectDetail";


// Chat Import
import ChatStart from "../chat/ChatStart";
import ChatRoom from "../chat/ChatRoom";
import ChatRoomList from "../chat/ChatRoomList";


function RouterApp() {

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


    // 라우터 설정 
    const router = createBrowserRouter([
        // 메인 페이지 라우팅 (+상품 전체 조회)
        {
            path: "/",
            element: <Root handleStorageChange={handleStorageChange} memberId={memberId}/>
        },

        // 회원, 로그인 라우팅
        {
            path: "/members/:member_id",
            element: <MyPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/members/update/:member_id",
            element: <MemberUpdatePage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/join",
            element: <MemberJoinPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/admin",
            element: <AdminPage handleStorageChange={handleStorageChange} memberId={memberId}/>
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
            element: <IdSearchPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/pw-search-page",
            element: <PwSearchPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },


        // 상품 라우팅
        {
            path: "/products/sell",
            element: <ProductInsertPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/products/:productNumber",
            element: <ProductDetailPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/products/update/:productNumber",
            element: <ProductUpdatePage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },


        //  공지사항 라우팅
        {
            path: "/info",
            element: <InfoSelect handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/info/:infoNumber",
            element: <InfoSelectDetail handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/info/insert",
            element: <InfoInsert handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/info/update/:infoNumber",
            element: <InfoUpdate handleStorageChange={handleStorageChange} memberId={memberId}/>
        },

        // 고객문의 라우팅 
        {
            path: "/cs",
            element: <CSSelect handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/cs/:csNumber",
            element: <CSSelectDetail handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/cs/insert",
            element: <CSInsert handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/cs/update/:csNumber",
            element: <CSUpdate handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/cs/delete/:csNumber",
            element: <CSDelete handleStorageChange={handleStorageChange} memberId={memberId}/>
        },


        //채팅 라우팅 테스터
		{
			path: "/chat-start",
			element: <ChatStart />
		},

		{
			path: "/chat-room/:roomId",
			element: <ChatRoom handleStorageChange={handleStorageChange} memberId={memberId}/>
		},
		
		{
            path: "/chat-rooms",
            element: <ChatRoomList handleStorageChange={handleStorageChange} memberId={memberId}/>
        }


    ]);

    return <RouterProvider router={router} />;

}

export default RouterApp;