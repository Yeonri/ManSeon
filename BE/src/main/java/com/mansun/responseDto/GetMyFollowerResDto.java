package com.mansun.responseDto;

import lombok.Builder;
import lombok.Getter;

@Builder
public class GetMyFollowerResDto {
    Long friendId;
    String email;
    String nickname;
    String name;
}
