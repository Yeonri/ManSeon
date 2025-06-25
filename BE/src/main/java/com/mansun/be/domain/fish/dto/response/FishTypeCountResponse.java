package com.mansun.be.domain.fish.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FishTypeCountResponse {
    private String fishName;
    private Long count;
}
