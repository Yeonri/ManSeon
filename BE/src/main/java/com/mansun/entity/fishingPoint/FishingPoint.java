package com.mansun.entity.fishingPoint;

import com.mansun.entity.fishingPoint.dataSet.MarineZone;
import com.mansun.entity.fishingPoint.dataSet.Observatory;
import com.mansun.entity.fishingPoint.dataSet.SunMoonTimes;
import com.mansun.entity.fishingPoint.dataSet.Weather;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class FishingPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id",columnDefinition = "INT UNSIGNED")
    private Long pointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MarineZone marineZone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "obs_code")
    private Observatory obsCode;

    @OneToMany(mappedBy = "fishingPoint")
    private List<Weather> weatherList;

    @OneToMany(mappedBy = "fishingPoint")
    private List<SunMoonTimes> sunMoonTimesList;


//    Column
    @Column(name = "point_name")
    @Schema(description = "낚시 포인트 이름")
    private String pointName;

    @Column(name = "lat")
    @Schema(description = "위도")
    private float lat;
    @Column(name = "lng")
    @Schema(description = "경도")
    private float lng;
    @Column(name = "primary_material")
    @Schema(description = "저질(물 속의 땅 구성)")
    private String primaryMaterial;
    @Column(name = "weather_x")
    @Schema
    private Integer weatherX;
    @Column(name = "weather_y")
    private Integer weatherY;
    @Column(name = "sunmoon_location")
    @Schema(description = "일출 일몰 위치")
    private String sunmoonLocation;
    @Column(name = "nearest_obs_code")
    @Schema(description = "가장 가까운 관측소")
    private String nearestObsCode;
    @Builder.Default
    private boolean deleted=false;
}
