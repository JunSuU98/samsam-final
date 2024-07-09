package com.samsam.begin.su.social.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoVO {
	
	private String token_type;
	private String access_token;
	private String id_token;
	private String expires_in;
	private String refresh_token;
	private String refresh_token_expires_in;
	private String scope;

}
