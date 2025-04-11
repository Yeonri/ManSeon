package com.mansun.be.domain.user.dto.response;

import com.mansun.be.domain.fish.dto.response.FishTypeCountResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetMyInfoResponse {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private String phoneNum;
    private List<List<Long>> fishCollections;
    private String profileImg;
    private int followingCount;
    private int followerCount;
}

