package com.samsam.begin.su.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.su.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
	
	// 아이디 중복 체크
	boolean existsByMemberId(String member_id);
	
	// ======= 검색 ====== //
	// 회원 아이디 검색
	Page<Member> findByMemberIdContaining(String member_id, Pageable pageable);
	
	// 회원 이름 검색 
	Page<Member> findByMemberNameContaining(String member_name, Pageable pageable);
	
	// 회원 전화번호 검색 
	Page<Member> findByMemberPhoneContaining(String member_phone, Pageable pageable);
	
	// 회원 이메일 검색 
	Page<Member> findByMemberEmailContaining(String member_email, Pageable pageable);
	
	// 회원 생일 검색
	Page<Member> findByMemberBirthContaining(String member_birth, Pageable pageable);
	
	// 회원 상태 검색 
	Page<Member> findByMemberStatusContaining(String member_status, Pageable pageable);
	
	// 회원 평점 검색 
	Page<Member> findByMemberRate(Integer member_rate, Pageable pageable);
	
	
	// member_id 로 member 찾기 
	Member findByMemberId(String member_id);
	
	// member_id 로 member 삭제
	int deleteByMemberId(String member_id);
}
