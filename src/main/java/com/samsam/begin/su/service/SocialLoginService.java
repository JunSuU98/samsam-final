package com.samsam.begin.su.service;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.samsam.begin.su.config.KakaoApiKeys;
import com.samsam.begin.su.config.NaverApiKeys;
import com.samsam.begin.su.social.vo.KakaoResponseVO;
import com.samsam.begin.su.social.vo.KakaoVO;
import com.samsam.begin.su.social.vo.NaverAPIVO;
import com.samsam.begin.su.social.vo.NaverResponseVO;
import com.samsam.begin.su.social.vo.NaverVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialLoginService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private final NaverApiKeys naverApiKeys;
	
	@Autowired
	private final KakaoApiKeys kakaoApiKeys;
	
	// 0. 네이버 로그인 api 사용
	public String getNaverLogin() {
		SecureRandom random = new SecureRandom();
	    String state = new BigInteger(130, random).toString();
		
		String url = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
		        + "&client_id=" + naverApiKeys.getNaverClientId()
		        + "&redirect_uri=" + naverApiKeys.getNaverRedirectURL() 
		        + "&state=" + state;	
		
		return url;
	}

	
	// 1. access token 발급 요청 
	public NaverVO getNaverAccessToken(String code) {
		
		String url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code"
				+ "&client_id=" + naverApiKeys.getNaverClientId()
				+ "&client_secret=" + naverApiKeys.getNaverClientSecret() 
				+ "&code=" + code;
		
		ResponseEntity<NaverVO> response = restTemplate.getForEntity(url, NaverVO.class);	
		
		if(response.getStatusCode() == HttpStatus.OK) {
			return response.getBody();
			
		} else {

			return null;
		}
	}
	
	// 2. access token 으로 접근해 사용자의 정보 요청
	public NaverResponseVO getNaverProfile(String accessToken) {
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		
		HttpEntity<String> entity = new HttpEntity<>(headers);

		String apiURL = "https://openapi.naver.com/v1/nid/me";
		
		ResponseEntity<NaverAPIVO> response2 = restTemplate.exchange(apiURL, HttpMethod.GET, entity, NaverAPIVO.class);
		
		if(response2.getStatusCode() == HttpStatus.OK) {
			return response2.getBody().getNaverResponseVO();
			
		}
		
		return null;
	}
	
	
	// 3. 네이버 로그아웃
	public String naverLogout(String accessToken, String refreshToken) {
		
		// 3-1. 네이버 access token 삭제 요청
		String deleteUrl = "https://nid.naver.com/oauth2.0/token?grant_type=delete"
				+ "&client_id=" + naverApiKeys.getNaverClientId()
				+ "&client_secret=" + naverApiKeys.getNaverClientSecret() 
				+ "&accessToken=" + accessToken
				+ "&service_provider=NAVER";
		
		ResponseEntity<String> response = restTemplate.getForEntity(deleteUrl, String.class);	
		
		if(response.getStatusCode() == HttpStatus.OK) { // 기존의 access token 삭제 성공
			System.out.println("naver 토큰 삭제 성공");
		} else {
			System.out.println("naver 토큰 삭제 실패");
		}
		
		// 3-2. 기존 refresh token 을 써서 더 이상 token refresh 할 수 없는지 확인
		String refreshUrl = "https://nid.naver.com/oauth2.0/token?grant_type=refresh_token"
				+ "&client_id=" + naverApiKeys.getNaverClientId()
				+ "&client_secret=" + naverApiKeys.getNaverClientSecret() 
				+ "&refresh_token=" + refreshToken;
		
		ResponseEntity<String> refreshResponse = restTemplate.getForEntity(refreshUrl, String.class);	
		
		if(refreshResponse.getStatusCode() == HttpStatus.OK) {
			
			if(refreshResponse.getBody().toString().contains("error")) { // refresh token 의 응답에 error 가 있으면 정상적으로 토큰 삭제가 이루어진 것이다
				
				System.out.println("네이버 로그아웃 성공");

				return "네이버 로그아웃 성공";
			}
			
			return "refresh api call success";
		} else {
			return "refresh api call fail";
		}
		
	}
	
	
	
	// 0. 카카오 로그인 api 사용 (access code 받음)
	public String getKakaoLogin() {
		
		String url = "https://kauth.kakao.com/oauth/authorize?"
				+ "&client_id=" + kakaoApiKeys.getClientId()
				+ "&redirect_uri=" + kakaoApiKeys.getRedirectURI()
				+ "&response_type=code";
		
		
		return url;
	}
	
	
	
	// 1. 카카오 access token 획득
	public KakaoVO getKakaoAccessToken(String code) {
		
		String tokenURL = "https://kauth.kakao.com/oauth/token";
		
		// http header 생성
		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=UTF-8");
		
		// http body 생성
		MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
		requestBody.add("grant_type", "authorization_code");
		requestBody.add("client_id", kakaoApiKeys.getClientId());
		requestBody.add("redirect_uri", kakaoApiKeys.getRedirectURI());
		requestBody.add("code", code);
		
		// http entity 생성 (헤더 + 바디)
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
		
		ResponseEntity<KakaoVO> response = restTemplate.postForEntity(tokenURL, requestEntity, KakaoVO.class);
		
		if(response.getStatusCode() == HttpStatus.OK) {
			return response.getBody();
		} else {
			return null;
		}
		
	}
	
	// 2. access token 을 통한 사용자 정보 획득
	public KakaoResponseVO getKakaoProfile(String accessToken) {
		
		String apiURL = "https://kapi.kakao.com/v2/user/me";
		
		// http header 생성
		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=UTF-8");
		headers.add("Authorization", "Bearer " + accessToken);
		
		HttpEntity<String> entity = new HttpEntity<>(headers);

		// kakao 회원 정보 api 에 get 요청
		ResponseEntity<KakaoResponseVO> response = restTemplate.exchange(apiURL, HttpMethod.GET, entity, KakaoResponseVO.class);
		
		if(response.getStatusCode() == HttpStatus.OK) {
			return response.getBody();
			
		} else {
			
			return null;
		}

	}
	
	// 3. 카카오 로그아웃
	public String kakaoLogout() {;
	
		String logoutURL = "https://kauth.kakao.com/oauth/logout?"
				+ "&client_id=" + kakaoApiKeys.getClientId()
				+ "&logout_redirect_uri=" + kakaoApiKeys.getLogoutRedirectURI();
		
		ResponseEntity<String> logoutResponse = restTemplate.getForEntity(logoutURL, String.class);	
		
		if(logoutResponse.getStatusCode() == HttpStatus.FOUND) {
			System.out.println("로그아웃 성공!!");
			return "kakao logout success";
		} else {
			System.out.println("로그아웃 실패!!!!!");
			return "kakao logout fail";
		}	
		
	}
	
	
	
}
