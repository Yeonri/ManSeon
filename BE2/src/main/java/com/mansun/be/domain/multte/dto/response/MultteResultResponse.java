package com.mansun.be.domain.multte.dto.response;

import com.mansun.be.domain.multte.entity.MultteResult;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MultteResultResponse {

    private String pointName;
    private double pointLat;
    private double pointLng;
    private double elboScore;

    public static MultteResultResponse from(MultteResult entity) {
        return MultteResultResponse.builder()
                .pointName(entity.getPointName())
                .pointLat(entity.getPointLat())
                .pointLng(entity.getPointLng())
                .elboScore(entity.getElboScore())
                .build();
    }
}
