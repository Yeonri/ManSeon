package com.mansun.requestDto.user;

import lombok.Getter;

@Getter
public class createUserReqDto {
    private String email;
    private String password;
    private String name;
    private String phoneNum;
    private String nickname;
}
