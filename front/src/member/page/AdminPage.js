import React, {useState, useEffect} from "react";
import axios from "axios";

import SearchForm from "../component/SearchForm";
import GoBackButton from "../component/button/GoBackButton";

function AdminPage(){

    return (
        <div style={{display: 'inline'}}>
            <SearchForm />
            <GoBackButton text={"이전"}/>
        </div>
    )

}

export default AdminPage;