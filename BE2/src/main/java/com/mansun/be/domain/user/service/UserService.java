package com.mansun.be.domain.user.service;


import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.auth.jwt.JwtUtil;
import com.mansun.be.common.auth.refresh.repository.RefreshRepository;
import com.mansun.be.common.imageUtil.ImageSaveManager;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.fish.dto.response.FishTypeCountResponse;
import com.mansun.be.domain.user.dto.request.CreateUserRequest;
import com.mansun.be.domain.user.dto.request.UpdateUserRequest;
import com.mansun.be.domain.user.dto.response.GetMyInfoResponse;
import com.mansun.be.domain.user.dto.response.GetUserInfoResponse;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.exception.UserAlreadyExistsException;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {
    private final EntityManager em;

    private final UserRepository userRepository;
    private final RefreshRepository refreshRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;


    // #1. 회원 가입 (CREATE USER)
    public ResponseEntity<ApiResponse<Void>> register(
            CreateUserRequest dto,
            HttpServletRequest request) {

        if (userRepository.existsByEmailAndDeletedFalse(dto.getEmail()))
            throw new UserAlreadyExistsException("이미 가입된 이메일입니다.");

        User user = User.create(dto, bCryptPasswordEncoder);
        userRepository.save(user);
        return ApiResponseUtil.success(null, "회원가입이 완료되었습니다.", HttpStatus.CREATED, request.getRequestURI());
    }

    // #2. 로그인 ( Controller X, Oauth2 O )
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() -> new RuntimeException("로그인할 사용자가 없습니다. 회원가입을 먼저 진행해주세요."));
        // System.out.println("loadUserByUsername Check"+" "+user.getUsername()+" "+user.getEmail());

        return new CustomUserDetails(user);
    }

    // #3. 내 정보 불러오기 (READ PRIVATE USER)
    public ResponseEntity<ApiResponse<GetMyInfoResponse>> getMyInfo(
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));

        List<List<Long>> fishCollection = user.getFishCollectionByType();

        GetMyInfoResponse response = GetMyInfoResponse.builder()
                .id(user.getUserId())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .phoneNum(user.getPhoneNum())
                .fishCollections(fishCollection)
                .profileImg(user.getProfileImg())
                .followingCount(user.getFollowingCount())
                .followerCount(user.getFollowerCount())
                .build();

        return ApiResponseUtil.success(response, "내 정보 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    // #4. 유저 정보 불러오기 (READ PUBLIC USER)
    public ResponseEntity<ApiResponse<GetUserInfoResponse>> getUserInfo(
            Long userId,
            HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));

        List<FishTypeCountResponse> collection = user.getFishTypeCountList();

        GetUserInfoResponse response = GetUserInfoResponse.builder()
                .id(userId)
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .collections(collection)
                .collectionCount(collection.size())
                .followerCount(user.getFollowerCount())
                .followingCount(user.getFollowingCount())
                .build();

        return ApiResponseUtil.success(response, "유저 정보 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    // #5. 회원 정보 수정
    @Transactional
    public ResponseEntity<ApiResponse<Void>> updateUser(
            CustomUserDetails userDetails,
            UpdateUserRequest dto,
            MultipartFile image,
            HttpServletRequest request) {

        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));

        if (dto.getNickname() != null) user.setNickname(dto.getNickname());
        if (dto.getPhoneNum() != null) user.setPhoneNum(dto.getPhoneNum());
        if (dto.getPassword() != null) user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));

        // 프로필 이미지 업데이트

        if ( image != null && image.isEmpty()) {
            // 1. 저장
            ImageSaveManager.processAndSaveImage(0, user.getUserId(), image);

            // 2. URL 생성
            String profileImgUrl = "/profile/" + user.getUserId() + ".jpg";

            // 3. DB 저장
            user.setProfileImg(profileImgUrl);
        }

        return ApiResponseUtil.success(null, "회원 정보 수정 성공", HttpStatus.OK, request.getRequestURI());
    }

    // #6. 회원 정보 삭제
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));

        if (user.isDeleted()) {
            throw new IllegalStateException("이미 탈퇴한 사용자입니다.");
        }

        user.setDeleted(true); // soft delete

        return ApiResponseUtil.success(null, "회원 탈퇴 완료", HttpStatus.OK, request.getRequestURI());
    }
    // #7. 로그아웃 (필터로 처리하고는 있는데, 만약을 대비함...)
    @Transactional
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;

        // 쿠키에서 refresh 찾기
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    refresh = cookie.getValue();
                }
            }
        }

        if (refresh == null) {
            throw new IllegalArgumentException("Refresh 토큰이 없습니다.");
        }

        // 토큰 만료 여부 확인 (옵션)
        if (jwtUtil.isExpired(refresh)) {
            throw new IllegalArgumentException("만료된 토큰입니다.");
        }

        // Refresh인지 확인
        if (!"refresh".equals(jwtUtil.getCategory(refresh))) {
            throw new IllegalArgumentException("유효한 refresh 토큰이 아닙니다.");
        }

        // DB에서 삭제
        refreshRepository.deleteByRefresh(refresh);

        // 쿠키 삭제
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }


    //////// 중복 확인 관련 /////////

    // #1. 닉네임 중복 확인
    public ResponseEntity<ApiResponse<Void>> verifyNickname(
            String nickname,
            HttpServletRequest request) {

        if (userRepository.existsByNicknameAndDeletedFalse(nickname))
            return ApiResponseUtil.failure("중복된 전화 닉네임입니다.", HttpStatus.NOT_FOUND, request.getRequestURI());

        return ApiResponseUtil.success(null, "사용 가능한 닉네임입니다.", HttpStatus.OK, request.getRequestURI());
    }

    // #2. 이메일 중복 확인
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            String email,
            HttpServletRequest request) {

        if (userRepository.existsByEmailAndDeletedFalse(email)) {
            return ApiResponseUtil.failure("중복된 전화 이메일입니다.", HttpStatus.NOT_FOUND, request.getRequestURI());
        }

        return ApiResponseUtil.success(null, "사용 가능한 이메일입니다.", HttpStatus.OK, request.getRequestURI());
    }

    // #3. 전화 번호 중복 확인
    public ResponseEntity<ApiResponse<Void>> verifyPhoneNum(
            String phoneNum,
            HttpServletRequest request) {

        if (userRepository.existsByPhoneNumAndDeletedFalse(phoneNum)) {
            return ApiResponseUtil.failure("중복된 전화 번호입니다.", HttpStatus.NOT_FOUND, request.getRequestURI());
        }

        return ApiResponseUtil.success( null, "사용 가능한 전화 번호입니다.", HttpStatus.OK, request.getRequestURI());

    }
}
