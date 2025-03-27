package com.mansun.entity.fishingPoint;

import com.mansun.entity.Users;
import jakarta.persistence.*;

public class UserPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

//    연관 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    private FishingPoint point;

    private String pointName;
    private float lat;
    private float lng;
}
