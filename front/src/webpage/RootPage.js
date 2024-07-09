import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import LoginModal from "../member/modal/LoginModal";
import LogoutButton from "../member/component/button/LogoutButton";
import ToJoinPageButton from "../member/component/button/ToJoinPageButton";
import MyPageButton from "../member/component/button/MyPageButton";


import SellProductButton from "../product/button/SellProductButton";

import LoginButton from "../member/component/button/LoginButton";
import MemberHeader from "../member/page/MemberHeader";


function Root({handleStorageChange, memberId}){

    return(

        <div>

            {/* MemberHeader */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            {/* 상품 검색창 컴포넌트 */}


            {/* 카테고리 선택 컴포넌트 */}


            {/* 상품 전체 조회 테이블 컴포넌트 */}


            {/* 공지사항 조회 링크 */}


            {/* 고객문의 조회 링크 */}
            <Link to={"/cs"} >고객문의</Link>

        </div>

    )
}

export default Root;