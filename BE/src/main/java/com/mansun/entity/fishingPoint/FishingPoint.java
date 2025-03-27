package com.mansun.entity.fishingPoint;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class FishingPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;



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
