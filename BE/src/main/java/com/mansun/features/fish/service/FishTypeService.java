package com.mansun.features.fish.service;

import com.mansun.requestDto.fish.CreateFishTypeReqDto;

public interface FishTypeService {
//    새로운 어종 추가
    void addNewFishType(CreateFishTypeReqDto req);
}
