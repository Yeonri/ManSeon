package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Observatory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "obs_id")
    private Long obsId;
//    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishingPoint point;

//    Column
    @Column( name = "obs_code")
    private String obsCode;
    @Column(name = "obs_lat")
    private float obsLat;
    @Column(name = "obs_lng")
    private float obsLng;

    private boolean isDelete;
}
