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
    private Long pointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MarineZone marineZone;


//    Column
    private String pointName;
    private float lat;
    private float lng;
    private String primaryMaterial;
    private Integer weatherX;
    private Integer weatherY;
    private String sunmoonLocation;
    private String nearestTideStation;
    @Builder.Default
    private boolean deleted=false;
}
