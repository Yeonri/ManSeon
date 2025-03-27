package com.mansun.entity.fishingPoint.dataSet;

import com.mansun.entity.fishingPoint.FishingPoint;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weatherId;

//    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishingPoint points;

    @OneToMany(mappedBy = "")
    private List<WaveHeight> waveHeight;

//    Column
    private LocalDate weatherDate;
    private LocalDateTime weatherTime;
    private int pop;
    private int pty;
    private int pcp;
    private int sno;
    private int sky;
    private int tmp;
    private int tmn;
    private int tmx;
    private int uuu;
    private int vvv;

    private int vec;
    private int wsd;
    private int reh;


}
