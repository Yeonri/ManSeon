package com.mansun.be.domain.fish.dto.response;

import com.mansun.be.domain.fish.entity.Fish;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class FishResponse {

    private Long fishId;
    private String fishName;
    private Float size;
    private String bait;
    private String equipment;
    private String fishImg;
    private Double lat;
    private Double lng;
    private LocalDateTime createdAt;

    public static FishResponse from(Fish fish) {
        return new FishResponse(
                fish.getFishId(),
                fish.getFishType().getFishName(),
                fish.getSize(),
                fish.getBait(),
                fish.getEquipment(),
                fish.getFishImg(),
                fish.getLat(),
                fish.getLng(),
                fish.getCreatedAt()
        );
    }
}
