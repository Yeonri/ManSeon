package com.mansun.responseDto.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class getMyInfoResDto {
    String email;
    String nickname;
    String name;
}
