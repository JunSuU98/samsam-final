package com.samsam.begin.su.vo;

import java.beans.ConstructorProperties;

import lombok.Getter;

@Getter
public class MemberVO {
	private Integer member_number;
	private String member_create;
	private String member_update;
	private String member_status;
	private String member_id;
	private String member_password;
	private String member_name;
	private String member_birth;
	private String member_email;
	private String member_phone;
	private Integer member_rate;
	private String member_address;
	
	private String id_check;
	
	
	
	
	@ConstructorProperties({"member_number", "member_create", "member_update", "member_status", "member_id", "member_password"
		, "member_name", "member_birth", "member_email", "member_phone", "member_rate", "member_address", "id_check"})
	public MemberVO(Integer member_number, String member_create, String member_update, String member_status,
			String member_id, String member_password, String member_name, String member_birth, String member_email,
			String member_phone, Integer member_rate, String member_address, String id_check) {

		this.member_number = member_number;
		this.member_create = member_create;
		this.member_update = member_update;
		this.member_status = member_status;
		this.member_id = member_id;
		this.member_password = member_password;
		this.member_name = member_name;
		this.member_birth = member_birth;
		this.member_email = member_email;
		this.member_phone = member_phone;
		this.member_rate = member_rate;
		this.member_address = member_address;
		
		this.id_check = id_check;
	}




	public MemberVO(Integer member_number, String member_create, String member_status, String member_id,
			String member_name, String member_birth, String member_email, String member_phone, Integer member_rate,
			String member_address) {
		this.member_number = member_number;
		this.member_create = member_create;
		this.member_status = member_status;
		this.member_id = member_id;
		this.member_name = member_name;
		this.member_birth = member_birth;
		this.member_email = member_email;
		this.member_phone = member_phone;
		this.member_rate = member_rate;
		this.member_address = member_address;
	}

	
	
}
