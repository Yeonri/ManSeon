package com.mansun.requestDto.user;

import lombok.Setter;

@Setter()
public class UpdateUserReqDto {
    Long userId;
    String email;
    String password;
    String nickname;
    String userName;
    String phoneNum;
    String profileImg = "";
    int followingNum = 0;
    int followerNum = 0;
}