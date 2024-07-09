package com.samsam.begin.su.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samsam.begin.su.entity.Member;
import com.samsam.begin.su.repository.LoginRepository;
import com.samsam.begin.su.repository.MemberRepository;

import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	
	@Inject
	private final LoginRepository loginRepository;
	
	
	// 로그인 
	@Transactional(readOnly = true)
	public Member login(String member_id, String member_password) {
		return loginRepository.findByMemberIdAndMemberPassword(member_id, member_password);
	}
	
	
	// 아이디 찾기 (이름, 생년월일, 핸드폰 일치)
	@Transactional(readOnly = true)
	public Member searchId(String member_name, String member_email, String member_phone) {
		
		return loginRepository.findByMemberNameAndMemberEmailAndMemberPhone(member_name, member_email, member_phone);
	}
	
	
	// 비밀번호 찾기 (아이디, 이름, 생년월일, 핸드폰 일치)
	@Transactional(readOnly = true)
	public Member searchPassword(String member_id, String member_name, String member_email, String member_phone) {
		return loginRepository.findByMemberIdAndMemberNameAndMemberEmailAndMemberPhone(member_id, member_name, member_email, member_phone);
	}
	
}
