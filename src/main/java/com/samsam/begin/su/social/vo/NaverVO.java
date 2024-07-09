package com.samsam.begin.su.social.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NaverVO {
	
	private String access_token;
	private String refresh_token;
	private String token_type;
	private String expires_in;

}
