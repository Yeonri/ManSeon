package com.mansun.responseDto.fishingPoint;

import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OnePointDetailInfoResDto {
    List<Weather> myWeatherList;
    List<TideLevel> myTideLevelList;
    List<Fish> myFishList;
}
