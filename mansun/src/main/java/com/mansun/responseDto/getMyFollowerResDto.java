package com.mansun.responseDto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class getMyFollowerResDto {
    String email;
    String nickname;
    String name;
}
