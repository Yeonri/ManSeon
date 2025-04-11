package com.mansun.be.domain.point.dto.response;

import com.mansun.be.domain.fish.entity.Fish;
import com.mansun.be.domain.point.entity.dataSet.TideLevel;
import com.mansun.be.domain.point.entity.dataSet.Weather;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class OnePointDetailInfoResDto {
    List<Weather> myWeatherList;
    List<TideLevel> myTideLevelList;
    List<Fish> myFishList;
}
