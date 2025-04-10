package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class SeaTemperature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "obs_code")
    private Observatory obsCode;

    @Column(name = "sea_date")
    private LocalDateTime seaDate;
    @Column(name = "sea_time")
    private LocalDateTime seaTime;
    @Column(name = "sea_temp")
    private float seaTemp;

}
