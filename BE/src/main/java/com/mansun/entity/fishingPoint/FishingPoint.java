package com.mansun.entity.fishingPoint;

import com.mansun.entity.fishingPoint.dataSet.MarineZone;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class FishingPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MarineZone marineZone;


//    Column
    private String pointName;
    private float pointLat;
    private float pointLng;
    private String primaryMaterial;
    private Integer weatherX;
    private Integer weatherY;
    private String sunmoonLocation;
    private String nearestTideStation;
}
