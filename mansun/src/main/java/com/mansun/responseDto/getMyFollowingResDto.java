package com.mansun.responseDto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class getMyFollowingResDto {
    Long friendId;
    String email;
    String nickname;
    String name;
}
