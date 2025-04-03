package com.mansun.features.fish.service;

import com.mansun.entity.fish.FishType;
import com.mansun.features.fish.repository.FishTypeRepository;
import com.mansun.requestDto.fish.CreateFishTypeReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FishTypeServiceImpl implements FishTypeService{
    private final FishTypeRepository repository;

//    새로운 어종 추가
    @Override
    public void addNewFishType(
            CreateFishTypeReqDto req
    ) {
        repository.save(FishType
                .builder()
                .fishName(req.getFishName())
                .fishPlace(req.getFishPlace())
                .characteristic(req.getCharacteristic())
                .build());
    }
}
