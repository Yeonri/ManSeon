package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class SunMoonTimes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sunmoon_id")
    private Long sunmoonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_id")
    private FishingPoint point;

//    Column
    @Column(name = "locdate")
    private LocalDate locDate;
    @Column(name = "sunrise")
    private LocalDateTime sunrise;
    @Column(name = "sunset")
    private LocalDateTime sunset;
    @Column(name = "moonrise")
    private LocalDateTime moonrise;
    @Column(name = "moonset")
    private LocalDateTime moonset;

    private boolean deleted;
}
