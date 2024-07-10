import React, {useState} from "react";
import Button from "react-bootstrap/esm/Button";

import LoginModal from "../../modal/LoginModal";

function LoginButton({ handleStorageChange }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (

        <div style={{ display: 'inline' }}>
            <Button variant="primary" onClick={handleShow}>
                로그인
            </Button>

            <LoginModal show={show} setShow={setShow} handleStorageChange={handleStorageChange}/>
        </div>

    )


}

export default LoginButton;