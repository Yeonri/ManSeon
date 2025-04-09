package com.mansun.be.domain.fish.dto.response;

import com.mansun.be.domain.fish.entity.Fish;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FishResponse {

    private Long fishId;
    private String fishName;
    private String fishPlace;
    private String fishCharacter;
    private String fishImg;
    private Double lat;
    private Double lng;
    private Float size;
    private String bait;
    private String equipment;
    private LocalDateTime createdAt;

    public static FishResponse from(Fish fish) {
        return FishResponse.builder()
                .fishId(fish.getFishId())
                .fishName(fish.getFishType().getFishName())
                .fishPlace(fish.getFishType().getFishPlace())
                .fishCharacter(fish.getFishType().getCharacter())
                .fishImg(fish.getFishImg())
                .lat(fish.getLat())
                .lng(fish.getLng())
                .size(fish.getSize())
                .bait(fish.getBait())
                .equipment(fish.getEquipment())
                .createdAt(fish.getCreatedAt())
                .build();
    }
}
