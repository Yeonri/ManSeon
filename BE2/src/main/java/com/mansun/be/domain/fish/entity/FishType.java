package com.mansun.be.domain.fish.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FishType {

    @Id
    private Integer fishType; // 직접 지정 (1: 광어, 2: 우럭...)

    @Column(nullable = false, length = 50)
    private String fishName; // 물고기 이름 (예: 광어)

    @OneToMany(mappedBy = "fishType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fish> fishes = new ArrayList<>();
}
