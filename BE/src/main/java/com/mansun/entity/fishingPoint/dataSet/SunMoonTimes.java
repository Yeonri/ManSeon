package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
public class SunMoonTimes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishingPoint point;

//    Column
    private LocalDate locDate;
    private LocalDateTime sunrise;
    private LocalDateTime sunset;
    private LocalDateTime moonrise;
    private LocalDateTime moonset;
}
