package com.mansun.responseDto.fishingPoint.allPoint;


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
