package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Observatory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long obsId;
//    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishingPoint point;

//    Column
    private String obsCode;
    private float obsLat;
    private float obsLng;
}
