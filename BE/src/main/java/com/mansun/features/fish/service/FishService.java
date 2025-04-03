package com.mansun.features.fish.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import com.mansun.responseDto.fishingPoint.FindFishDiaryListResDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface FishService {
    void createFish(CustomUserDetails customUserDetails, CreateFishReqDto req);

    Map<LocalDate, List<FindFishDiaryListResDto>> findMyFishDiaryList(CustomUserDetails customUserDetails);

    List<FindFishDiaryListResDto> findOthersFishDiaryList(CustomUserDetails customUserDetails, Long userId);

    FindFishResDto findMyFish(CustomUserDetails customUserDetails, Long fishId);

    FindFishResDto findOtherFish(CustomUserDetails customUserDetails, Long userId, Long fishId);
}
