package com.samsam.begin.su.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samsam.begin.su.entity.Member;
import com.samsam.begin.su.repository.MemberRepository;

import jakarta.inject.Inject;


@Service
public class MemberService{
	
	@Inject
	MemberRepository memberRepository;
	
	// 검색 결과에 따른 전체 조회 (페이징 포함)
	@Transactional(readOnly = true)
	public Page<Member> findAllMember(String searchFilter, String searchQuery, int page, int size){
		
		Pageable pageable = PageRequest.of(page, size);
		
		// 검색필터와 검색어를 모두 입력한 경우 
		if(searchFilter != null && searchQuery != null) {
			if(searchFilter.equals("member_id")) {
				return memberRepository.findByMemberIdContaining(searchQuery, pageable);
			} 
			
			if(searchFilter.equals("member_name")) {
				return memberRepository.findByMemberNameContaining(searchQuery, pageable);
			}

			if(searchFilter.equals("member_phone")) {
				return memberRepository.findByMemberPhoneContaining(searchQuery, pageable);
			}
			
			if(searchFilter.equals("member_email")) {
				return memberRepository.findByMemberEmailContaining(searchQuery, pageable);
			}
			
			if(searchFilter.equals("member_birth")) {
				return memberRepository.findByMemberBirthContaining(searchQuery, pageable);
			}
			
			if(searchFilter.equals("member_status")) {
				return memberRepository.findByMemberStatusContaining(searchQuery, pageable);
			}
			
			if(searchFilter.equals("member_rate")) {
				return memberRepository.findByMemberRate(Integer.parseInt(searchQuery), pageable);
			}
		}
		
		// 처음 MemberSelect 에 진입한 경우 (검색필터, 검색어 없는 경우)
		return memberRepository.findAll(pageable);
	}
	
	// 상세 조회
	@Transactional(readOnly = true)
	public Member findMemberById(Integer member_number) {
		return memberRepository.findById(member_number).orElse(null);
	}
	
	// id 통한 상세 조회
	@Transactional(readOnly = true)
	public Member findMemberByMemberId(String member_id) {
		return memberRepository.findByMemberId(member_id);
	}
	
	// 회원 입력, 수정
	@Transactional
	public Member saveMember(Member member) {
		return memberRepository.save(member);
	}
	
	// 회원 삭제 
	@Transactional
	public void deleteMember(Integer member_number) {
		memberRepository.deleteById(member_number);
	}
	
	// id 로 삭제
	@Transactional
	public int deleteMember(String member_id) {
		return memberRepository.deleteByMemberId(member_id);
	}

	
	// 아이디 체크
	@Transactional(readOnly = true)
	public boolean idCheck(String member_id) {
		
		return memberRepository.existsByMemberId(member_id);
	}
}
