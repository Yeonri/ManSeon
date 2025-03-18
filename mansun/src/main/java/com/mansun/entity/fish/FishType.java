package com.mansun.entity.fish;

import com.mansun.entity.fish.Fish;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
public class FishType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fishType;

    //    연관 관계
    @OneToMany(mappedBy = "fishType")
    private List<Fish> type;

    //    Column
    @Column(nullable = false)
    private String fishName;
    @Column(nullable = false)
    private String fishPlace;
    @Column(nullable = false)
    private String characteristic;
}
