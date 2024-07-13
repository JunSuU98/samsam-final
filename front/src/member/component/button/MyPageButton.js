import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function MyPageButton({member_id}) {

    return (
        <Link to={`/members/${member_id}`}>
            <Button variant="outline-primary">마이페이지</Button>{' '}
        </Link>

    )

}

export default MyPageButton;