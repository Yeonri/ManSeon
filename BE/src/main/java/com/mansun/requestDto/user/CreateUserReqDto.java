package com.mansun.requestDto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "회원가입할 유저의 필요 정보")
public class CreateUserReqDto {
    @Schema(defaultValue = "1234@naver.com")
    String email;
    @Schema(defaultValue = "1234")
    String password;
    @Schema(defaultValue = "1234")
    String username;
    @Schema(defaultValue = "01012341234")
    String phoneNum;
}
