package com.mansun.responseDto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetMyFollowingResDto {
    Long friendId;
    String email;
    String nickname;
    String name;
}
