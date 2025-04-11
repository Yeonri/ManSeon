package com.mansun.be.domain.point.dto.response.allPoint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TideDayResDto {
    private LocalDate date;
    private TideSimpleDto highTide;
    private TideSimpleDto lowTide;
}