package com.mansun.entity.fish;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Fish {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishId;

    //연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishType fishType;

    
    //Column
    private LocalDateTime createdAt;
    private float lat;
    private float lng;

    private float size;
    private String bait;

    private String equipment;
    private String fishImg;
}
