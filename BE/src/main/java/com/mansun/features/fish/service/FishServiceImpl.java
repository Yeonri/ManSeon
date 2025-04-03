package com.mansun.features.fish.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fish.FishType;
import com.mansun.entity.fish.QFish;
import com.mansun.features.fish.repository.FishRepository;
import com.mansun.features.fish.repository.FishTypeRepository;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import com.mansun.responseDto.fish.collection.Collection;
import com.mansun.responseDto.fish.collection.CollectionListResDto;
import com.mansun.responseDto.fishingPoint.FindFishDiaryListResDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FishServiceImpl implements FishService {
    private final JPAQueryFactory queryFactory;

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;

//    내가 포획한 물고기 추가
    @Override
    public void createFish(CustomUserDetails customUserDetails, CreateFishReqDto req) {
        //도감기록을 추출할 때 어떤 검증 절차를 거쳐야 하는가??
        fishRepository.save(Fish
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

//    나의 일기 리스트 조회
    @Override
    public Map<LocalDate, List<FindFishDiaryListResDto>> findMyFishDiaryList(CustomUserDetails customUserDetails) {
        QFish fish = QFish.fish;

//
//        List<Fish> fishList = queryFactory
//                .selectFrom(fish)
//                .where(fish.user.userId.eq(customUserDetails.getUserId()))
//                .orderBy(fish.createdAt.desc())
//                .fetch();
        List<Fish> fishList=fishRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());

//        날짜를 key, 그날 잡은 물고기 리스트를 value로 하는 gruoped Map을 선언
        Map<LocalDate, List<FindFishDiaryListResDto>> grouped = new LinkedHashMap<>();
//        리스트를 순회한다.
        for (Fish f : fishList) {
            LocalDate date = f.getCreatedAt().toLocalDate();
//            그룹에 해당 key가 존재할 경우 그대로 추가하고, 없다면 새로운 List를 생성해 추가한다.
            grouped.computeIfAbsent(date, k -> new ArrayList<>()).add(
                    FindFishDiaryListResDto.builder()
                            .fishId(f.getFishId())
                            .fishType(f.getFishType().getFishName())
                            .size(f.getSize())
                            .createdAt(f.getCreatedAt())
                            .fishImg(f.getFishImg())
                            .build()
            );
        }

        return grouped;
    }

//    타인의 낚시 일기를 조회한다.
    @Override
    public List<FindFishDiaryListResDto> findOthersFishDiaryList(CustomUserDetails customUserDetails, Long userId) {
//        UserId를 이용해 사용자가 잡은 Fish List를 조회한다.
        List<Fish> findFishList = fishRepository.findByUser_UserIdAndDeletedFalse(userId);
        return findFishList.stream().map(
                f -> FindFishDiaryListResDto
                        .builder()
                        .fishId(f.getFishId())
                        .fishType(f.getFishType().getFishName())
                        .fishImg(f.getFishImg())
                        .createdAt(f.getCreatedAt())
                        .size(f.getSize())
                        .build()
        ).collect(Collectors.toList());
    }

//    fishId로 사용자가 잡은 물고기를 단건 조회한다.
    @Override
    public FindFishResDto findMyFish(CustomUserDetails customUserDetails, Long fishId) {
        Fish findFish = fishRepository.findByUser_UserIdAndFishIdAndDeletedFalse(customUserDetails.getUserId(), fishId);
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
        Fish findFish = fishRepository.findByUser_UserIdAndFishIdAndDeletedFalse(userId, fishId);
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

    public List<FindFishListResDto> findMyFishList(CustomUserDetails customUserDetails) {
        List<Fish> myFishList = fishRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());
        return myFishList.stream().map(
                f -> FindFishListResDto
                        .builder()
                        .fishId(f.getFishId())
                        .fishType(f.getFishType().getFishName())
                        .size(f.getSize())
                        .date(f.getCreatedAt().toLocalDate())
                        .lat(f.getLat())
                        .lng(f.getLng())
                        .bait(f.getBait())
                        .equipment(f.getEquipment())
                        .fishImg(f.getFishImg())
                        .build()
        ).collect(Collectors.toList());
    }

    public List<FindFishListResDto> findOtherFishList(CustomUserDetails customUserDetails, Long userId) {
        List<Fish> myFishList = fishRepository.findByUser_UserIdAndDeletedFalse(userId);
        return myFishList.stream().map(
                f -> FindFishListResDto
                        .builder()
                        .fishId(f.getFishId())
                        .fishType(f.getFishType().getFishName())
                        .size(f.getSize())
                        .date(f.getCreatedAt().toLocalDate())
                        .lat(f.getLat())
                        .lng(f.getLng())
                        .bait(f.getBait())
                        .equipment(f.getEquipment())
                        .fishImg(f.getFishImg())
                        .build()
        ).collect(Collectors.toList());
    }

    public List<CollectionListResDto> findMyCollectionList(CustomUserDetails customUserDetails) {
//        24종의 전체 어종을 모두 가져온다.
        List<FishType> allFishTypeList = fishTypeRepository.findAll();
//        반환할 리스트를 미리 생성한다.
        List<CollectionListResDto> responselist = new ArrayList<>();
//        24종의 전체 어종을 순회하면서 내가 잡았는지 확인한다.
//        잡았다면 userId와 FishType으로 내가 잡은 해당어종 리스트를 불러온다.

//        또한 잡은 위치의 포인트 위도와 경도, 잡은 시간을 기록한다.
        for (FishType ft : allFishTypeList) {
            List<Fish> capturedFishList = fishRepository
                    .findByUser_UserIdAndFishType_FishType(customUserDetails.getUserId(), ft.getFishType());
            responselist.add(new CollectionListResDto(
                            ft.getFishType(),
                            ft.getFishName(),
                            ft.getCharacteristic(),
                            ft.getFishImg(),
                            !capturedFishList.isEmpty(),
                            capturedFishList.stream().map(
                                            cf -> new Collection(cf.getLat(), cf.getLng(), cf.getCreatedAt().toLocalDate())
                                    )
                                    .collect(Collectors.toList())
                    )
            );
        }
        return responselist;
    }
}