package com.mansun.be.domain.user.dto.response;

import com.mansun.be.domain.fish.dto.response.FishTypeCountResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserInfoResponse {

    private Long id;
    private String nickname;
    private String profileImg;
    private List<FishTypeCountResponse> collections;
    private int collectionCount;
    private int followerCount;
    private int followingCount;

}
