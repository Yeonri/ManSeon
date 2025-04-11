package com.mansun.be.domain.user.entity;

import com.mansun.be.common.auth.jwt.JwtUtil;
import com.mansun.be.common.auth.oauth.response.OAuth2Response;
import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.fish.dto.response.FishTypeCountResponse;
import com.mansun.be.domain.fish.entity.Fish;
import com.mansun.be.domain.follow.entity.Follower;
import com.mansun.be.domain.follow.entity.Following;
import com.mansun.be.domain.user.dto.request.CreateUserRequest;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "user", indexes = {@Index(name = "idx_user_deleted", columnList = "deleted")})
public class User {

    // =================== 기본 필드 =================== //
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String phoneNum;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String nickname;

    private String profileImg; // URL이 들어갈 것

    private int followingCount; // 캐싱용

    private int followerCount;  // 캐싱용

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private boolean deleted;

    // =================== 연관 관계 ===================
    @OneToMany(mappedBy = "user")
    private List<Board> board;

    @OneToMany(mappedBy = "user")
    private List<Following> followings = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    private List<Follower> followers = new ArrayList<>();

//    @OneToMany(mappedBy = "user")
//    private  List<>

    @OneToMany(mappedBy = "user")
    private List<Fish> fishes = new ArrayList<>();



    // =================== 정적 생성자 ===================

    public static User create(CreateUserRequest dto, BCryptPasswordEncoder bCryptPasswordEncoder) {
        return User.builder()
                .username(dto.getName())
                .phoneNum(dto.getPhoneNum())
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .role("USER")
                .profileImg(dto.getProfileImg())
                .followingCount(0)
                .followerCount(0)
                .deleted(false)
                .build();
    }

    public static User createFromOAuth(OAuth2Response dto,String nickname) {
        return User.builder()
                .email(dto.getEmail())
                .username(dto.getName())
                .nickname(nickname) // response에 따라 getNickname()이 존재해야 함
                .role("USER") // 기본 권한 부여
                .deleted(false)
                .build();
    }

    public static User createFromJwt(JwtUtil jwtUtil, String accessToken) {
        return User.builder()
                .email(jwtUtil.getEmail(accessToken))
                .userId(Long.parseLong(jwtUtil.getuserId(accessToken)))
                .build();
    }

    public List<FishTypeCountResponse> getFishTypeCountList() {
        return fishes.stream()
                .filter(f -> !f.isDeleted() && f.getFishType() != null)
                .collect(Collectors.groupingBy(
                        f -> f.getFishType().getFishName(),
                        Collectors.counting()
                ))
                .entrySet().stream()
                .map(e -> new FishTypeCountResponse(e.getKey(), e.getValue()))
                .sorted((a, b) -> Long.compare(b.getCount(), a.getCount())) // 내림차순 정렬
                .toList();
    }

    public List<List<Long>> getFishCollectionByType() {
        // 1. 유효한 Fish 필터링
        List<Fish> validFishes = this.fishes.stream()
                .filter(f -> !f.isDeleted() && f.getFishType() != null)
                .toList();

        // 2. fishType 번호별로 groupBy
        Map<Integer, List<Long>> groupedByType = validFishes.stream()
                .collect(Collectors.groupingBy(
                        f -> f.getFishType().getFishType(),
                        Collectors.mapping(Fish::getFishId, Collectors.toList())
                ));

        // 3. 최대 fishType 번호 찾기
        int maxType = groupedByType.keySet().stream()
                .max(Integer::compareTo)
                .orElse(0);

        // 4. 0부터 maxType까지 빈 배열 포함한 전체 배열 구성
        List<List<Long>> result = new ArrayList<>();
        for (int i = 0; i <= maxType; i++) {
            result.add(groupedByType.getOrDefault(i, new ArrayList<>()));
        }

        return result;
    }

}
