package com.mansun.be.domain.point.entity.dataSet;

import com.mansun.be.domain.point.entity.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Observatory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "obs_code")
    private String obsCode;
//    연관 관계

    @OneToMany(mappedBy = "obsCode")
    private List<FishingPoint> fishingPoint;

    @OneToMany(mappedBy = "obsCode")
    private List<TideLevel> tideLevel;

    @OneToMany(mappedBy = "obsCode")
    private List<SeaTemperature> seaTemperature;

    //    Column
    @Column(name = "obs_lat")
    private float obsLat;
    @Column(name = "obs_lng")
    private float obsLng;

}
