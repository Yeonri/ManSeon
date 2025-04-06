package com.mansun.entity.fish;

import com.mansun.entity.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete", columnList = "deleted"))
@Schema(title = "사용자가 포획한 물고기 종류", description = "사용자가 포획한 물고기의 종류")
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishId;

    //연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private FishType fishType;


    //Column
    private LocalDateTime createdAt;
    private float lat;
    private float lng;

    @Schema(description = "물고기의 크기")
    private float size;
    @Schema(description = "미끼")
    private String bait;
    @Schema(description = "사용한 장비")
    private String equipment;
    @Schema(description = "물고기 사진")
    private String fishImg;

    @Builder.Default
    private boolean deleted = false;
}
