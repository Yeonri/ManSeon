package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class TideLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
//    연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Observatory obs;

    private LocalDateTime recordTime;
    private int tideLevel;

    private boolean isDelete;
}
