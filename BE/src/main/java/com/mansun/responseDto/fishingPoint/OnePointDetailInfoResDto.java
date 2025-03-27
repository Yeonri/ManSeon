package com.mansun.responseDto.fishingPoint;

import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.dataSet.TideLevel;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import lombok.Builder;

import java.util.List;

@Builder
public class OnePointDetailInfoResDto {
    List<Weather> myWeatherList;
    List<TideLevel> myTideLevelList;
    List<Fish> myFishList;
}
