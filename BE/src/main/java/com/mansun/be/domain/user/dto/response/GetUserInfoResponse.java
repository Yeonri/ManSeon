package com.mansun.be.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserInfoResponse {

    private String nickname;
    private String profileImg;

    private int followerCount;
    private int followingCount;

}
