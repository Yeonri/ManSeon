package com.mansun.common.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class KakaoInfo {
    private Long userId;
    private String nickname;
    private String email;

    public KakaoInfo(String nickname, String email) {
        this.nickname = nickname;
        this.email = email;
    }

    public KakaoInfo(Long userId, String nickname, String email) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
    }
}
