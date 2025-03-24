package com.mansun.requestDto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(name = "회원가입할 유저의 필요 정보")
public class CreateUserReqDto {
    @Schema(defaultValue = "1234@naver.com")
    private String email;
    @Schema(defaultValue = "1234")
    private String password;
    @Schema(defaultValue = "1234")
    private String name;
    @Schema(defaultValue = "01012341234")
    private String phoneNum;
    @Schema(defaultValue = "1234")
    private String nickname;
}
