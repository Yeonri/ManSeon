package com.mansun.be.domain.multte.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "MultteResult")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MultteResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datetime;

    @Column(name = "point_id")
    private Integer pointId;
    @Column(name = "point_name")
    private String pointName;
    @Column(name = "point_lat")
    private Double pointLat;
    @Column(name ="point_lng")
    private Double pointLng;
    @Column(name = "elbo_score")
    private Double elboScore;

    // 생성자 or builder는 필요 시 추가
}

