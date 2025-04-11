package com.mansun.be.domain.point.entity.dataSet;

import com.mansun.be.domain.point.entity.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
public class SunMoonTimes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sunmoon_id", columnDefinition = "INT UNSIGNED")
    private Long sunmoonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_id")
    private FishingPoint fishingPoint;

    //    Column
    @Column(name = "locdate")
    private LocalDate locDate;
    @Column(name = "sunrise")
    private LocalTime sunrise;
    @Column(name = "sunset")
    private LocalTime sunset;
    @Column(name = "moonrise")
    private LocalTime moonrise;
    @Column(name = "moonset")
    private LocalTime moonset;
}
