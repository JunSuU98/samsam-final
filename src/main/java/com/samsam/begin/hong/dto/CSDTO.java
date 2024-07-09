package com.samsam.begin.hong.dto;

//import lombok.Data;

//@Data
public class CSDTO {
	private int csNumber;
	private String csTitle;
	private String csDate;
	private String csContent;
	private String memberId;
	
	public int getCsNumber() {
		return csNumber;
	}

	public void setCsNumber(int csNumber) {
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

	@Override
	public String toString() {
		return "CSDTO [csNumber=" + csNumber + ", csTitle=" + csTitle + ", csDate=" + csDate + ", csContent="
				+ csContent + ", memberId=" + memberId + "]";
	}
	
	
}