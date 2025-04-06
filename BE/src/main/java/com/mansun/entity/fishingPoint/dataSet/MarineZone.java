package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class MarineZone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Lzone")
    private Integer lzone;

    @OneToMany(mappedBy = "marineZone")
    private List<FishingPoint> fishingPoint;

    @OneToMany(mappedBy = "marineZone")
    private List<Wave> wave;

    @Column(name = "lat_lb")
    private double lat_lb;
    @Column(name = "lon_lb")
    private double lon_lb;
    @Column(name = "lat_lt")
    private double lat_lt;
    @Column(name = "lon_lt")
    private double lon_lt;
    @Column(name = "lat_rt")
    private double lat_rt;
    @Column(name = "lon_rt")
    private double lon_rt;
    @Column(name = "lat_rb")
    private double lat_rb;
    @Column(name = "lon_rb")
    private double lon_rb;
}
