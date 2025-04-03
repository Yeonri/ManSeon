package com.mansun.entity.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete",columnList = "isDelete"))
@Schema(title = "서비스에서 제공하는 뱃지의 종류", description = "서비스 전체 뱃지의 이름과 이미지를 가지고 있는 Dto")
public class Badges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "뱃지 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long badgeId;

    //    Column
    @Schema(description = "뱃지 이름")
    @Column(nullable = false, unique = true)
    private String badgeName;
    @Column(nullable = false)
    @Schema(description = "뱃지 이미지 경로")
    private String badgeImg;

    @Builder.Default
    private boolean deleted=false;

}
