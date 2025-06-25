package com.mansun.be.domain.point.dto.response.allPoint;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TideSimpleDto {
    private double value;  // 수위
    private String time;   // "HH:mm" 등 간단한 시각 문자열
}
