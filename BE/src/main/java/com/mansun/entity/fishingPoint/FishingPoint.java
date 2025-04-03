package com.mansun.entity.fishingPoint;

import com.mansun.entity.fishingPoint.dataSet.MarineZone;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(indexes = @Index(name = "isDelete",columnList = "isDelete"))
public class FishingPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long pointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Lzone")
    private MarineZone marineZone;


//    Column
    @Column(name = "point_name")
    private String pointName;
    @Column(name = "lat")
    private float lat;
    @Column(name = "lng")
    private float lng;
    @Column(name = "primary_material")
    private String primaryMaterial;
    @Column(name = "weather_x")
    private Integer weatherX;
    @Column(name = "weather_y")
    private Integer weatherY;
    @Column(name = "sunmoon_location")
    private String sunmoonLocation;
    @Column(name = "nearest_obs_code")
    private String nearestObsCode;
    @Builder.Default
    private boolean deleted=false;
}
