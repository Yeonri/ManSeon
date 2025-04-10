package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Wave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wave_id")
    private Long waveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Lzone")
    private MarineZone marineZone;

    @Column(name = "date_time")
    private LocalDateTime dateTime;
    @Column(name = "wave_height")
    private double waveHeight;

    @Column(name = "wvprd_max")
    private double wvprdMax;

    @Column(name = "wave_direction")
    private double waveDirection;

    @Column(name = "wind_direction")
    private double windDirection;
    @Column(name = "wind_speed")
    private double windSpeed;
}
