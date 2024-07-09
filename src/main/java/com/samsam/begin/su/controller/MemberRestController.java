package com.samsam.begin.su.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.samsam.begin.su.entity.Member;
import com.samsam.begin.su.service.MemberService;
import com.samsam.begin.su.vo.MemberVO;

import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberRestController {
	
	@Inject
	private final MemberService memberService;
	
	// 회원 전체 조회 (페이징) 
	@GetMapping("/admin")
	public ResponseEntity<Map<String, Object>> getAllMembers(@RequestParam(name = "searchFilter", required = false) String searchFilter
			, @RequestParam(name = "searchQuery", required = false) String searchQuery
			, @RequestParam(name = "page", defaultValue = "1") int page
			, @RequestParam(name = "size", defaultValue = "5") int size) {
		
		Page<Member> memberPage = memberService.findAllMember(searchFilter, searchQuery, page - 1, size);
		
		if(memberPage != null) {

			List<Member> memberList = memberPage.getContent();
			int totalPage = memberPage.getTotalPages();
			
			Map<String, Object> responseMap = new HashMap<>();
			responseMap.put("memberList", memberList);
			responseMap.put("totalPage", totalPage);
			responseMap.put("currentPage", page);
		
			return new ResponseEntity<>(responseMap, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// 회원 상세 조회
	@GetMapping("/members/{member_id}")
	public ResponseEntity<Member> getMember(@PathVariable("member_id") String member_id) {

		Member member = memberService.findMemberByMemberId(member_id);
		
		if(member != null) {
			return new ResponseEntity<>(member, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	// 회원 입력
	@PostMapping("/join")
	public ResponseEntity<Member> createMember(@RequestBody MemberVO memberVO) {
		
		if(memberService.idCheck(memberVO.getMember_id())) { // 자바스크립트 비활성화 하고 submit 할 경우를 방지한다
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Member member = new Member();
		
		String today = LocalDate.now().toString();
		
		member.setMemberCreate(today);
		member.setMemberUpdate(today);
		member.setMemberStatus("active");
		member.setMemberId(memberVO.getMember_id());
		member.setMemberPassword(memberVO.getMember_password());
		member.setMemberName(memberVO.getMember_name());
		member.setMemberBirth(memberVO.getMember_birth());
		member.setMemberEmail(memberVO.getMember_email());
		member.setMemberPhone(memberVO.getMember_phone());
		member.setMemberRate(0);
		member.setMemberAddress(memberVO.getMember_address());
		
		memberService.saveMember(member);

		return new ResponseEntity<Member>(member, HttpStatus.OK);
	}
	
	// 회원 정보 수정
	@PutMapping("/members/{member_id}")
	public ResponseEntity<Member> updateMember(@PathVariable("member_id") String member_id, @RequestBody MemberVO memberVO) {
		
		Member exsistingMember = memberService.findMemberByMemberId(memberVO.getMember_id());
		
		if(exsistingMember != null) {
			exsistingMember.setMemberUpdate(memberVO.getMember_update());
			exsistingMember.setMemberPassword(memberVO.getMember_password());
			exsistingMember.setMemberName(memberVO.getMember_name());
			exsistingMember.setMemberBirth(memberVO.getMember_birth());
			exsistingMember.setMemberEmail(memberVO.getMember_email());
			exsistingMember.setMemberPhone(memberVO.getMember_phone());
			exsistingMember.setMemberAddress(memberVO.getMember_address());
					
			memberService.saveMember(exsistingMember);
			
			return new ResponseEntity<Member>(exsistingMember, HttpStatus.OK);
		} else {
			return new ResponseEntity<Member>(HttpStatus.NOT_FOUND);
		}

	}
	
	// 회원 삭제
	@DeleteMapping("/members/{member_id}")
	public ResponseEntity<Void> deleteMember(@PathVariable("member_id") String member_id) {
		
		int deleted = memberService.deleteMember(member_id);
		
		if(deleted > 0) {
			// 성공적으로 삭제되었을 경우 204 No Content 코드를 반환한다
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			// 삭제에 실패했을 경우 404 Not Found 코드를 반환한다
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	// 아이디 중복 확인
	@GetMapping("/id-check/{member_id}")
	public String idCheck(@PathVariable(required = false, name = "member_id") String member_id) {
		
		memberService.idCheck(member_id);
		
		int result = 0;
		
		if (memberService.idCheck(member_id) || member_id.isBlank()) { // 존재하는 아이디를 입력하거나, 빈 문자열을 입력했을 때
			result = 1;
		}
		
		return ""+result;
	}
	

}
