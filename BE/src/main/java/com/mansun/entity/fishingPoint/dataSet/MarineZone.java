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
    private Long Lzone;

    @OneToMany(mappedBy = "marineZone")
    private List<FishingPoint> fishingPoint;

    @OneToMany(mappedBy = "marineZone")
    private List<WaveHeight> waveHeight;

    private double lat_lb;
    private double lon_lb;
    private double lat_lt;
    private double lon_lt;
    private double lat_rt;
    private double lon_rt;
    private double lat_rb;
    private double lon_rb;
}
