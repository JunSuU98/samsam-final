import React, {useState, useEffect} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function ToMainPageButton(){

    return(

        <Link to={"/"}>
            <Button variant="outline-primary">메인화면</Button>{' '}
        </Link>

    )

}

export default ToMainPageButton;