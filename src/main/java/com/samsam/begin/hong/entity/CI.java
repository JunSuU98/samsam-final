package com.samsam.begin.hong.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

//@NoArgsConstructor
//@Getter
//@Setter
@Entity
public class CI {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cs_seq")
	@SequenceGenerator(name = "cs_seq", sequenceName = "cs_sequence", allocationSize = 1)
	@Column(name="cs_number")
	private Integer csNumber;
	@Column(name="cs_title")
	private String csTitle;
	@Column(name="cs_date")
	private String csDate;
	@Column(name="cs_content")
	private String csContent;
	@Column(name="member_id")
	private String memberId;
	
	public CI() {
	}

	public Integer getCsNumber() {
		return csNumber;
	}

	public void setCsNumber(Integer csNumber) {
		this.csNumber = csNumber;
	}

	public String getCsTitle() {
		return csTitle;
	}

	public void setCsTitle(String csTitle) {
		this.csTitle = csTitle;
	}

	public String getCsDate() {
		return csDate;
	}

	public void setCsDate(String csDate) {
		this.csDate = csDate;
	}

	public String getCsContent() {
		return csContent;
	}

	public void setCsContent(String csContent) {
		this.csContent = csContent;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	
	
}