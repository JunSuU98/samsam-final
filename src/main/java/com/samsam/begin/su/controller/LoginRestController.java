package com.samsam.begin.su.controller;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.samsam.begin.su.entity.Member;
import com.samsam.begin.su.service.LoginService;
import com.samsam.begin.su.service.MemberService;
import com.samsam.begin.su.vo.MemberVO;

import jakarta.inject.Inject;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LoginRestController {
	
	@Inject
	private final LoginService loginService;
	
	@Inject
	private final MemberService memberService; 
	
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberVO memberVO, HttpSession httpSession){
		
		Member member = loginService.login(memberVO.getMember_id(), memberVO.getMember_password());
		
		// 로그인에 성공하면 회원의 정보를 세션에 저장한다
		if(member!= null) {
			
			MemberVO memberVO2 = new MemberVO(member.getMemberNumber()
				, member.getMemberCreate()
				, member.getMemberStatus()
				, member.getMemberId()
				, member.getMemberName()
				, member.getMemberBirth()
				, member.getMemberEmail()
				, member.getMemberPhone()
				, member.getMemberRate()
				, member.getMemberAddress()
				);

			
			return new ResponseEntity<>(memberVO2, HttpStatus.OK);
			
		} else { // 로그인 실패 

			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	// 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession httpSession){
		httpSession.invalidate();
		
		
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	// 아이디 찾기
	@PostMapping("/id-search")
	public ResponseEntity<?> idSearch(@RequestBody MemberVO memberVO){
		
		Member member = loginService.searchId(memberVO.getMember_name(), memberVO.getMember_email(), memberVO.getMember_phone());
		
		if(member != null) {
			return new ResponseEntity<>(member.getMemberId(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	// 비밀번호 찾기 
	@PostMapping("/pw-search")
	public ResponseEntity<?> pwSearch(@RequestBody MemberVO memberVO){
		
		Member member = loginService.searchPassword(memberVO.getMember_id(), memberVO.getMember_name(), memberVO.getMember_email(), memberVO.getMember_phone());
		
		if(member != null) {
			return new ResponseEntity<>(member.getMemberId(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// 비밀번호 재설정
	@PutMapping("/pw-update")
	public ResponseEntity<?> pwUpdate(@RequestBody MemberVO memberVO){
		
		Member exsistingMember = memberService.findMemberByMemberId(memberVO.getMember_id());

		if(exsistingMember != null) {
			exsistingMember.setMemberUpdate(LocalDate.now().toString());
			exsistingMember.setMemberPassword(memberVO.getMember_password());
					
			memberService.saveMember(exsistingMember);
			
			return new ResponseEntity<Member>(exsistingMember, HttpStatus.OK);
		} else {
			return new ResponseEntity<Member>(HttpStatus.NOT_FOUND);
		}
		
	}
	

}
