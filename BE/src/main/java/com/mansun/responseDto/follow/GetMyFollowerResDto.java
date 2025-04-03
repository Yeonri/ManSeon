package com.mansun.responseDto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
public class GetMyFollowerResDto {
    Long userId;
    Long followerId;
    String email;
    String nickname;
    String name;
}
