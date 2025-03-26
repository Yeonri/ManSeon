package com.mansun.features.fish.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;

import java.util.List;

public interface FishService {
    void createFish(CustomUserDetails customUserDetails, CreateFishReqDto req);

    List<FindFishListResDto> findMyFishList(CustomUserDetails customUserDetails);

    List<FindFishListResDto> findOthersFishList(CustomUserDetails customUserDetails, Long userId);

    FindFishResDto findMyFish(CustomUserDetails customUserDetails, Long fishId);

    FindFishResDto findOtherFish(CustomUserDetails customUserDetails, Long userId, Long fishId);
}
