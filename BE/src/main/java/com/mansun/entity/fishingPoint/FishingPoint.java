package com.mansun.entity.fishingPoint;

import com.mansun.entity.fishingPoint.dataSet.MarineZone;
import com.mansun.entity.fishingPoint.dataSet.Observatory;
import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class FishingPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id", columnDefinition = "INT UNSIGNED")
    private Long pointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Lzone")
    private MarineZone marineZone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nearest_obs_code")
    private Observatory obsCode;

    @OneToMany(mappedBy = "fishingPoint")
    private List<Weather> weatherList;

    @OneToMany(mappedBy = "fishingPoint")
    private List<SunMoonTimes> sunMoonTimesList;


    //    Column
    @Column(name = "point_name")
    @Schema(description = "낚시 포인트 이름")
    private String pointName;

    @Column(name = "point_lat")
    @Schema(description = "위도")
    private float lat;
    @Column(name = "point_lng")
    @Schema(description = "경도")
    private float lng;
    @Column(name = "primary_material")
    @Schema(description = "저질(물 속의 땅 구성)")
    private String primaryMaterial;
    @Column(name = "depth_range")
    @Schema(description = "수심 범위")
    private String depthRange;
    @Column(name = "weather_x")
    @Schema
    private Integer weatherX;
    @Column(name = "weather_y")
    private Integer weatherY;
    @Column(name = "sunmoon_location")
    @Schema(description = "일출 일몰 위치")
    private String sunmoonLocation;
}
