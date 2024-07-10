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

import CSTestSelect from "../component/CsSelect";

// Info Page Import
import InfoInsert from "../webpage/info/InfoInsert";
import InfoSelect from "../webpage/info/InfoSelect";
import InfoDetail from "../info/InfoDetail";
import InfoUpdate from "../webpage/info/InfoUpdate";


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


        // 상품 라우팅
        {
            path: "/products/sell",
            element: <ProductInsertPage handleStorageChange={handleStorageChange} memberId={memberId}/>
        },
        {
            path: "/products/:productNumber",
            element: <ProductDetailPage memberId={memberId}/>
        },
        {
            path: "/products/update/:productNumber",
            element: <ProductUpdatePage />
        },


        //  공지사항 라우팅
        {
            path: "/info",
            element: <InfoSelect />
        },
        {
            path: "/info/:infoNumber",
            element: <InfoDetail />
        },
        {
            path: "/info/insert",
            element: <InfoInsert />
        },
        {
            path: "/info/update/:infoNumber",
            element: <InfoUpdate />
        },

        // 고객문의 라우팅 
        {
            path: "/cs",
            element: <CSSelect />
        },
        {
            path: "/cs/:csNumber",
            element: <CSSelectDetail memberId={memberId}/>
        },
        {
            path: "/cs/insert",
            element: <CSInsert memberId={memberId}/>
        },
        {
            path: "/cs/update/:csNumber",
            element: <CSUpdate />
        }

    ]);

    return <RouterProvider router={router} />;

}

export default RouterApp;