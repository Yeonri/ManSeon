package com.mansun.requestDto.follow;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeleteFollowReqDto {
    Long user_id;
}
