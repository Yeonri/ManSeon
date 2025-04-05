package com.mansun.entity.badge;

import com.mansun.entity.Users;
import com.mansun.entity.badge.Badges;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
@Schema(title = "유저가 가지고 있는 뱃지 종류", description = "회원이 가진 뱃지와 전체 뱃지를 확인하는 중간 Entity")
public class UserBadge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "primaryKey")
    private Long pk;
//    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @Schema(title="회원")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @Schema(title="회원이 소유한 뱃지")
    private Badges badge;
    @Builder.Default
    private boolean deleted=false;
}
