package com.samsam.begin.su.social.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoResponseVO {

    private long id;
    private String connected_at;
    
    @JsonProperty("kakao_account")
    private KakaoAccountVO kakao_account;

}