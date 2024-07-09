import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom";

function ToUpdatePageButton(){

    const {member_id} = useParams();

    return(
        <Link to={`/members/update/${member_id}`}>
            <Button variant="outline-success">내 정보 수정</Button>{' '}
        </Link>
    )

}

export default ToUpdatePageButton;