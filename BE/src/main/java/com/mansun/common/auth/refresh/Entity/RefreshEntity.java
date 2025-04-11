package com.mansun.common.auth.refresh.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("refresh_token") // Redis key prefix
public class RefreshEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String email;

    private String refresh;

//    private String expiration;

    @TimeToLive
    private Long ttl; // Redis TTL (초 단위)

    // 생성자 또는 빌더에서 TTL 기본값 세팅해줄 수 있어
    public static RefreshEntity createWithTTL( String email, String refresh) {
        return RefreshEntity.builder()
                .email(email)
                .refresh(refresh)
//                .expiration(expiration)
                .ttl(14 * 24 * 60 * 60L) // 14일 → 1209600초
                .build();
    }
}
