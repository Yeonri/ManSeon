package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class SeaTemperature {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @ManyToOne(fetch = FetchType.LAZY)
    private Observatory obs;

    private LocalDateTime seaDate;
    private LocalDateTime seaTime;
    private float seaTemp;
}
