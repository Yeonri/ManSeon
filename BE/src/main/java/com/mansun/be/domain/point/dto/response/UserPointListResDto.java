package com.mansun.be.domain.point.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
public class UserPointListResDto {
    Long id;
    String name;
    float latitude;
    float longitude;
}
