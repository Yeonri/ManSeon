package com.mansun.features.fish.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import com.mansun.responseDto.fishingPoint.FindFishDiaryListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@Service
@Transactional
public interface FishService {
//    포획 시 사용자의 포획한 물고기 추가
    void createFish(CustomUserDetails customUserDetails, CreateFishReqDto req);
//    날짜에 따른 내 포획 일기
    Map<LocalDate, List<FindFishDiaryListResDto>> findMyFishDiaryList(CustomUserDetails customUserDetails);

    List<FindFishDiaryListResDto> findOthersFishDiaryList(CustomUserDetails customUserDetails, Long userId);
//    내가 포획한 물고기 단 건 조회
    FindFishResDto findMyFish(CustomUserDetails customUserDetails, Long fishId);
//    타인이 포획한 물고기 단 건 조회
    FindFishResDto findOtherFish(CustomUserDetails customUserDetails, Long userId, Long fishId);
}
