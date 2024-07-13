import React, {useState, useEffect} from "react";
import axios from "axios";
import '../../App.css';

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
                        <h1 className="mb-0 ms-2" style={{ fontFamily: 'Jua' }}>SAMSAM</h1>
                    </Col>
                    {memberId === "admin" && <Link to={"/admin"} className="memberheader-admin-link">관리자 페이지</Link>}
                    </Navbar.Brand>
        

                <div className="d-flex align-items-center">

					<div className="auth-buttons-container" style={{ display: 'flex', alignItems: 'center' }}>
						{memberId === null ? (
							<div className="auth-buttons">
								<LoginButton handleStorageChange={handleStorageChange} />
								<ToJoinPageButton />
							</div>
						) : (
							<div className="auth-buttons">
								<LogoutButton handleStorageChange={handleStorageChange} />
								<MyPageButton member_id={memberId} />
							</div>
						)}
                        {memberId !== "admin" &&
                            <div className="sell-button-container">
                                <SellProductButton memberId={memberId} handleStorageChange={handleStorageChange} />
                            </div>
                        }
					</div>
                
                </div>

            </Container>
        </Navbar>

        </div>

    )
}

export default MemberHeader;