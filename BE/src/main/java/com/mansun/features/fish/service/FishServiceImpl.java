package com.mansun.features.fish.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fish.FishType;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FishServiceImpl implements FishService {
    private final FishRepository repository;

    @Override
    public void createFish(CustomUserDetails customUserDetails, CreateFishReqDto req) {
        //도감기록을 추출할 때 어떤 검증 절차를 거쳐야 하는가??
        repository.save(Fish
                .builder()
                .createdAt(LocalDateTime.now())
                .lat(req.getLat())
                .lng(req.getLng())
                .size(req.getSize())
                .bait(req.getBait())
                .user(new Users(customUserDetails))
                .equipment(req.getEquipment())
                .fishImg(req.getFishImg())
                .build());
    }

    @Override
    public List<FindFishListResDto> findMyFishList(CustomUserDetails customUserDetails) {
        List<Fish> findFishList = repository.findByUser_UserId(customUserDetails.getUserId());
        return findFishList.stream().map(
                f ->
                    FindFishListResDto.builder()
                            .fishId(f.getFishId())
                            .build()
        ).collect(Collectors.toList());
    }

    @Override
    public List<FindFishListResDto> findOthersFishList(CustomUserDetails customUserDetails, Long userId) {
        List<Fish> findFishList = repository.findByUser_UserId(userId);
        return findFishList.stream().map(
                f -> FindFishListResDto.builder().build()
        ).collect(Collectors.toList());
    }

    @Override
    public FindFishResDto findMyFish(CustomUserDetails customUserDetails, Long fishId) {
        Fish findFish = repository.findByUser_UserIdAndFishId(customUserDetails.getUserId(), fishId);
        return FindFishResDto
                .builder()
                .fishId(findFish.getFishId())
                .lat(findFish.getLat())
                .lng(findFish.getLng())
                .size(findFish.getSize())
                .createdAt(findFish.getCreatedAt())
                .bait(findFish.getBait())
                .equipment(findFish.getEquipment())
                .fishImg(findFish.getFishImg())
                .build();
    }

    @Override
    public FindFishResDto findOtherFish(CustomUserDetails customUserDetails, Long userId, Long fishId) {
        Fish findFish = repository.findByUser_UserIdAndFishId(userId, fishId);
        return FindFishResDto
                .builder()
                .fishId(findFish.getFishId())
                .lat(findFish.getLat())
                .lng(findFish.getLng())
                .size(findFish.getSize())
                .createdAt(findFish.getCreatedAt())
                .bait(findFish.getBait())
                .equipment(findFish.getEquipment())
                .fishImg(findFish.getFishImg())
                .build();
    }
}
