package com.mansun.entity.fish;

import com.mansun.entity.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "사용자가 포획한 물고기 종류",description = "사용자가 포획한 물고기의 종류")
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
