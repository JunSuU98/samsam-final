package com.samsam.begin.su.social.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoAccountVO {

	@JsonProperty("profile")
	private KakaoProfileVO profile;
	private String name;
	private String email;
	private String age_range;
	private String birthyear;
	private String birthday;;
	private String phone_number;
}
