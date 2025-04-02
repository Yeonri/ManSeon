package com.mansun.requestDto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SetNicknameReqDto {
    @Schema(defaultValue = "1234@naver.com")
    String email;
    @Schema(defaultValue = "닉네임 바꿀건데요")
    String nickname;
}
