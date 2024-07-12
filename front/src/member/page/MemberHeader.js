import React, {useState, useEffect} from "react";
import axios from "axios";

import LogoutButton from "../component/button/LogoutButton";
import ToJoinPageButton from "../component/button/ToJoinPageButton";
import MyPageButton from "../component/button/MyPageButton";
import SellProductButton from "../../product/button/SellProductButton";
import LoginButton from "../component/button/LoginButton";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from "react-bootstrap/esm/Col";


import { Link } from "react-router-dom";

function MemberHeader({handleStorageChange, memberId}){

    return(

        <div>

            <Navbar className="bg-body-tertiary">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                    <Col xs="auto">
                        <img
                        alt=""
                        src={process.env.PUBLIC_URL + "/samsamlogo.png"}
                        width="80"
                        height="80"
                        className="d-inline-block align-top"
                        />
                    </Col>
                    <Col>
                        <h1 className="mb-0 ms-2">SAMSAM</h1>
                    </Col>
                    </Navbar.Brand>
        

                <div className="d-flex align-items-center">
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

            </Container>
        </Navbar>


            {/* <SellProductButton memberId={memberId} handleStorageChange={handleStorageChange}/> */}

            {/* 로그인 관련 컴포넌트 */}
            {/* <div style={{display: 'inline'}}>
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
 */}
                {/* {memberId === "admin" && <Link to={"/admin"}>admin page</Link>} */}
            {/* </div> */}

        </div>

    )
}

export default MemberHeader;