package com.samsam.begin.su.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
@Getter
public class NaverApiKeys {

	@Value("${naver.login.client.id}")
	private String naverClientId;
	
	@Value("${naver.login.client.secret}")
	private String naverClientSecret;

	@Value("${naver.login.service.url}")
	private String naverServiceURL;

	@Value("${naver.login.redirect.url}")
	private String naverRedirectURL;

	
}
