import React, {useState, useEffect} from "react";
import axios from "axios";


import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function GoBackButton({text}){

    const navigate = useNavigate();

    return(
        <div style={{display: 'inline'}}>
            <Button variant="primary" onClick={() => navigate(-1)}>{text}</Button>{' '}
        </div>
    );

}

export default GoBackButton;