package com.mansun.entity.fishingPoint.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class TideLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
//    연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "obs_code")
    private Observatory obsCode;


    @Column(name = "tph_time")
    private LocalDateTime tphTime;
    @Column(name = "hl_code")
    private int hlCode;
    @Column(name = "tph_level")
    private int tphLevel;

    private boolean deleted;
}
