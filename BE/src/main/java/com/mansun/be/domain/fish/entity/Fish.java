package com.mansun.be.domain.fish.entity;

import com.mansun.be.domain.fish.dto.request.FishCreateRequest;
import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private FishType fishType;

    @Column(nullable = false)
    private Double lat;

    @Column(nullable = false)
    private Double lng;

    private Float size;

    private String bait;

    private String equipment;

    private String fishImg;

    private LocalDateTime createdAt;

    @Builder.Default
    private boolean deleted = false;

    // 정적 팩토리 메서드
    public static Fish create(User user, FishType fishType, FishCreateRequest dto) {
        return Fish.builder()
                .user(user)
                .fishType(fishType)
                .lat(dto.getLat())
                .lng(dto.getLng())
                .size(dto.getSize())
                .bait(dto.getBait())
                .equipment(dto.getEquipment())
                .fishImg(dto.getFishImg())
                .createdAt(LocalDateTime.now())
                .build();

    }


}
