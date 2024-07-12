import React, {useState, useEffect} from "react";
import axios from "axios";

import SearchForm from "../component/SearchForm";
import GoBackButton from "../component/button/GoBackButton";
import MemberHeader from "../page/MemberHeader";

function AdminPage({handleStorageChange, memberId}){

    return (

        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <div style={{display: 'inline'}}>
                <SearchForm />
                <GoBackButton text={"이전"}/>
            </div>
        </div>
    )

}

export default AdminPage;