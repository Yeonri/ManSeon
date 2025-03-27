package com.mansun.requestDto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter()
public class UpdateUserReqDto {
    Long userId;
    String email;
    String password;
    String nickname;
    String username;
    String phoneNum;
    String profileImg = "";
    int followingNum = 0;
    int followerNum = 0;
}