package com.mansun.entity.fish;

import com.mansun.entity.fish.Fish;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
@Schema(title = "전체 물고기 종류", description = "전체 어종이 담고 있어야 할 물고기 이름, 서식지, 특징")
public class FishType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishType;

    //    연관 관계
    @OneToMany(mappedBy = "fishType")
    private List<Fish> type;

    //    Column
    @Column(nullable = false,unique = true)
    @Schema(description = "물고기 종 이름")
    private String fishName;

    @Column(nullable = false)
    @Schema(description = "물고기 서식지")
    private String fishPlace;

    @Column(nullable = false)
    @Schema(description = "물고기 특징")
    private String characteristic;

    @Schema(description = "물고기 이미지")
    private String fishImg;

    @Builder.Default
    private boolean deleted=false;
}
