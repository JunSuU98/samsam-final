package com.samsam.begin.su.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
@Getter
public class KakaoApiKeys {
	
	@Value("${kakao.login.client.id}")
	private String clientId;
	
	@Value("${kakao.login.client.secret}")
	private String clientSecret;
	
	@Value("${kakao.login.redirect.uri}")
	private String redirectURI;
	
	@Value("${kakao.login.service.url}")
	private String serviceURL;

	@Value("${kakao.logout.redirect.uri}")
	private String logoutRedirectURI;

}
