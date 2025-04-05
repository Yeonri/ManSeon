package com.mansun.entity.fishingPoint;

import com.mansun.entity.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class UserPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    //    연관 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    private FishingPoint point;

    @Schema(description = "낚시 포인트 명")
    private String pointName;
    @Schema(description = "위도")
    private float lat;
    @Schema(description = "경도")
    private float lng;
    @Builder.Default
    private boolean deleted = false;
}
