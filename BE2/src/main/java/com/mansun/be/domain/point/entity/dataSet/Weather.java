package com.mansun.be.domain.point.entity.dataSet;

import com.mansun.be.domain.point.entity.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weather_id", columnDefinition = "INT UNSIGNED")
    private Long weatherId;

    //    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_id")
    private FishingPoint fishingPoint;

    //    Column
    @Column(name = "weather_date")
    private LocalDate weatherDate;
    @Column(name = "weather_time")
    private LocalTime weatherTime;
    private int pop;
    private int pty;
    private String pcp;
    private String sno;
    private int sky;
    private int tmp;
    private int tmn = Integer.MIN_VALUE;
    private int tmx = Integer.MAX_VALUE;

    private int reh;
}
