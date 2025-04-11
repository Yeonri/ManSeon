package com.mansun.requestDto.follow;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AddFollowReqDto {
    Long user_id;
}
