package com.samsam.begin.su.social.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NaverAPIVO {
	
	private String resultcode;
	private String message;
	
	@JsonProperty("response")
	private NaverResponseVO naverResponseVO;
	
}
