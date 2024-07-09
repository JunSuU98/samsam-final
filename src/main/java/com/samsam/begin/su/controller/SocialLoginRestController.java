package com.samsam.begin.su.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.samsam.begin.su.service.SocialLoginService;
import com.samsam.begin.su.social.vo.KakaoResponseVO;
import com.samsam.begin.su.social.vo.NaverResponseVO;
import com.samsam.begin.su.social.vo.NaverVO;

@RestController
public class SocialLoginRestController {
	
	@Autowired
	private SocialLoginService socialLoginService;
	
	// 네이버 로그인 
	@GetMapping("/api/naver-login-callback")
	public ResponseEntity<Map<String, Object>> naverLoginCallback(@RequestParam("code") String code, @RequestParam("state") String state) {
		
		// 1. 사용자 로그인 등록으로 access token 생성
		NaverVO naverVO = socialLoginService.getNaverAccessToken(code);

		String accessToken = naverVO.getAccess_token();
		String refreshToken = naverVO.getRefresh_token();
		
		// 2. access token 으로 접근해 사용자의 정보 요청
		NaverResponseVO naverResponseVO = socialLoginService.getNaverProfile(accessToken);
		
		// 3. 사용자의 정보를 응답으로 반환
		if(naverResponseVO != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("accessToken", accessToken);
			response.put("refreshToken", refreshToken);
			response.put("naverResponseVO", naverResponseVO);
			
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	// 네이버 로그아웃
	@PostMapping("/naver-logout")
	public void naverLogout(@RequestBody NaverVO naverVO) {
		
		socialLoginService.naverLogout(naverVO.getAccess_token(), naverVO.getRefresh_token());

	}
	
	
	
	// 카카오 로그인 
	@GetMapping("/api/kakao-login-callback")
	public ResponseEntity<KakaoResponseVO> kakaoLoginCallback(@RequestParam("code") String code) {
		
		// 1. 사용자 로그인 등록으로 access token 생성
		String accessToken = socialLoginService.getKakaoAccessToken(code).getAccess_token();
		
		// 2. access token 으로 접근해 사용자의 정보 요청
		KakaoResponseVO kakaoResponseVO = socialLoginService.getKakaoProfile(accessToken);
		
		// 3. 사용자의 정보를 응답으로 반환
		if(kakaoResponseVO != null) {
			return new ResponseEntity<>(kakaoResponseVO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	// 카카오 로그아웃
	@GetMapping("/kakao-logout")
	public void kakaoLogout() {
		
		socialLoginService.kakaoLogout();
		
	}

}
