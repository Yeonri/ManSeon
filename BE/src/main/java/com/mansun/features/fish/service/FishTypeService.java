package com.mansun.features.fish.service;

import com.mansun.requestDto.fish.CreateFishTypeReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface FishTypeService {
//    새로운 어종 추가
    void addNewFishType(CreateFishTypeReqDto req);
}
