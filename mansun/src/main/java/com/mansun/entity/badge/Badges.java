package com.mansun.entity.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import javax.annotation.processing.Generated;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "서비스에서 제공하는 뱃지의 종류",description = "서비스 전체 뱃지의 이름과 이미지를 가지고 있는 Dto")
public class Badges {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "뱃지 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long badgeId;

//    Column
    @Schema(description = "뱃지 이름")
    private String badgeName;
    @Schema(description = "뱃지 이미지 경로")
    private String badgeImg;

}
