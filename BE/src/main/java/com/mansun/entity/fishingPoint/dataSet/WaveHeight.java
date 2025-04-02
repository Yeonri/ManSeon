package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
public class WaveHeight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private MarineZone marineZone;

    private LocalDateTime dateTime;
    private double waveHeight;
    private double waveDirection;
    private double waveSpeed;
    private double windDirection;

    private boolean isDelete;
}
