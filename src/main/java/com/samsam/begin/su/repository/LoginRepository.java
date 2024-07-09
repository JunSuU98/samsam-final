package com.samsam.begin.su.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.begin.su.entity.Member;

public interface LoginRepository extends JpaRepository<Member, Integer>{
	
	// 로그인 
	Member findByMemberIdAndMemberPassword(String member_id, String member_password);
	
	// 아이디 찾기
	Member findByMemberNameAndMemberEmailAndMemberPhone(String member_name, String member_email, String member_phone);
	
	// 비밀번호 찾기
	Member findByMemberIdAndMemberNameAndMemberEmailAndMemberPhone(String member_id, String member_name, String member_email, String member_phone);


}
