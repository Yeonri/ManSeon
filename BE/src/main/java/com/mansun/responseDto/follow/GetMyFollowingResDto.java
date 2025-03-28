package com.mansun.responseDto.follow;

import lombok.Builder;
import lombok.Getter;

@Builder
public class GetMyFollowingResDto {
    Long friendId;
    String email;
    String nickname;
    String name;
}
