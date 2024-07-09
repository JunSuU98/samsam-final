import React, {useState, useEffect} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

import {Link} from 'react-router-dom';

function MemberTable({ memberList }){

	return(
		<Table striped bordered hover>
			<thead>
			<tr>
				<th>회원 이름</th>
				<th>회원 상태</th>
				<th>아이디</th>
				<th>비밀번호</th>
				<th>이메일</th>
				<th>핸드폰 번호</th>
				<th>생년월일</th>
				<th>주소</th>
				<th>매너온도</th>
				<th>가입일자</th>
				<th>업데이트 일자</th>
				<th>상세보기</th>
			</tr>
			</thead>

			<tbody>

				{memberList.map(member => (
					<tr key={member.memberId}>
						<td>{member.memberName}</td>
						<td>{member.memberStatus}</td>
						<td>{member.memberId}</td>
						<td>{member.memberPassword}</td>
						<td>{member.memberEmail}</td>
						<td>{member.memberPhone}</td>
						<td>{member.memberBirth}</td>
						<td>{member.memberAddress}</td>
						<td>{member.memberRate}</td>
						<td>{member.memberCreate}</td>
						<td>{member.memberUpdate}</td>
						<td>
							<Link to={`/members/${member.memberId}`}>상세보기</Link>
						</td>
					</tr>
				))}
				
			</tbody>
		</Table>

	);
}


export default MemberTable;
