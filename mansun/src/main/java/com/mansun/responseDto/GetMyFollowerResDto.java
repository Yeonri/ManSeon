package com.mansun.responseDto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GetMyFollowerResDto {
    Long friendId;
    String email;
    String nickname;
    String name;
}
