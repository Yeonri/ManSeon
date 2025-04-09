package com.mansun.be.domain.user.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.user.dto.request.CreateUserRequest;
import com.mansun.be.domain.user.dto.request.UpdateUserRequest;
import com.mansun.be.domain.user.dto.response.GetMyInfoResponse;
import com.mansun.be.domain.user.dto.response.GetUserInfoResponse;
import com.mansun.be.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    // #1. 회원 가입
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> register(
            @RequestBody @Valid CreateUserRequest dto,
            HttpServletRequest request) {

        return userService.register(dto, request);
    }

    //@PostMapping("/login")
    // 로그인 과정의 대략적인 설명 : 해당 요청 mapping은 이곳에 있지 않다.
    // service의 loadbyusername과 common/auth/SecurityConfig 참고
    // Service에서는 우선 입력받은 email과 password를 이용해서 DB에서 사람을 찾는다.
    // 해당 사람을 찾을 경우는 CustomUserDetails란 이름으로 객체를 생성해서 그 안에 해당 유저를 넣으면 Security Logic 작동


    // #3. 내 정보 불러오기 (READ PRIVATE USER)
    @GetMapping
    public ResponseEntity<ApiResponse<GetMyInfoResponse>> getMyInfo(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        return userService.getMyInfo(userDetails, request);
    }

    // #4. 유저 정보 불러오기 (READ PUBLIC USER)
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<GetUserInfoResponse>> getUserInfo(
            @PathVariable Long userId,
            HttpServletRequest request) {

        return userService.getUserInfo(userId, request);
    }

    // #5. 회원정보 수정
    @PatchMapping
    public ResponseEntity<ApiResponse<Void>> updateUser(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody UpdateUserRequest dto,
            HttpServletRequest request
    ) {
        return userService.updateUser(userDetails, dto, request);
    }

    // #6. 회원정보 삭제(soft)
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {

        return userService.deleteUser(userDetails, request);
    }

    // #7. 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logout(request, response);
        return ApiResponseUtil.success(null, "로그아웃 성공", HttpStatus.OK, request.getRequestURI());
    }


    //////// 중복 확인 관련 /////////

    // #1. 닉네임 중복 확인
    @GetMapping("/duplicate/nickname")
    public ResponseEntity<ApiResponse<Void>> verifyNickname(
            @RequestParam("nickname") String nickname,
            HttpServletRequest request) {

        return userService.verifyNickname(nickname, request);
    }

    // #2. 이메일 중복 확인
    @GetMapping("/duplicate/email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestParam String email,
            HttpServletRequest request) {

        return userService.verifyEmail(email, request);
    }

    // #3. 핸드폰 중복 확인
    @GetMapping("/duplicate/phoneNum")
    public ResponseEntity<ApiResponse<Void>> verifyPhoneNum(
            @RequestParam String phoneNum,
            HttpServletRequest request) {

        return userService.verifyPhoneNum(phoneNum, request);
    }
}






}


