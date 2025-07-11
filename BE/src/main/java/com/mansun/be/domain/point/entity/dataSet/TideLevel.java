package com.mansun.be.domain.point.entity.dataSet;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class TideLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "obs_code")
    private Long pk;
    //    연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "obs_code")
    private Observatory obsCode;


    @Column(name = "tph_time")
    private LocalDateTime tphTime;
    @Column(name = "hl_code")
    private String hlCode;
    @Column(name = "tph_level")
    private int tphLevel;

}
