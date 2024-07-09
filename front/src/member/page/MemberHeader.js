import React, {useState, useEffect} from "react";
import axios from "axios";

import LogoutButton from "../component/button/LogoutButton";
import ToJoinPageButton from "../component/button/ToJoinPageButton";
import MyPageButton from "../component/button/MyPageButton";
import SellProductButton from "../../product/button/SellProductButton";
import LoginButton from "../component/button/LoginButton";

import { Link } from "react-router-dom";

function MemberHeader({handleStorageChange, memberId}){

    return(

        <div>


            <SellProductButton memberId={memberId} handleStorageChange={handleStorageChange}/>

            {/* 로그인 관련 컴포넌트 */}
            <div style={{display: 'inline'}}>
                {memberId === null ? (
                    <>
                        <LoginButton handleStorageChange={handleStorageChange}/>
                        <ToJoinPageButton />
                    </>
                        ) : (
                    <>
                    <LogoutButton handleStorageChange={handleStorageChange} />
                    <MyPageButton member_id={memberId} />
                    </>
                )}

                {memberId === "admin" && <Link to={"/admin"}>admin page</Link>}
            </div>

        </div>

    )
}

export default MemberHeader;