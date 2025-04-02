package com.mansun.requestDto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserReqDto {
    @Schema(defaultValue = "1")
    Long userId;
    @Schema(defaultValue = "이메일 바꿔요")
    String email;
    @Schema(defaultValue = "비밀번호 바꿔요")
    String password;
    @Schema(defaultValue = "닉네임 바꿔요")
    String nickname;
    @Schema(defaultValue = "이름 바꿔요")
    String username;
    @Schema(defaultValue = "01011111111")
    String phoneNum;
    String profileImg = "";
    int followingNum = 0;
    int followerNum = 0;
}