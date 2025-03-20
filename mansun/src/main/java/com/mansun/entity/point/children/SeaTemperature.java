package com.mansun.entity.point.children;

import com.mansun.entity.point.children.Observatory;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class SeaTemperature {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @ManyToOne(fetch = FetchType.LAZY)
    private Observatory obs;

    private LocalDateTime seaDate;
    private LocalDateTime seaTime;
    private float seaTemp;
}
