package com.mansun.features.user;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.user.service.UserServiceImpl;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.SetNicknameReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import com.mansun.responseDto.MessageResDto;
import com.mansun.responseDto.follow.GetMyFollowerResDto;
import com.mansun.responseDto.follow.GetMyFollowingResDto;
import com.mansun.responseDto.user.GetMyInfoResDto;
import com.mansun.responseDto.user.GetTheOtherOneInfoResDto;
import com.mansun.responseDto.user.VerifyEmailResDto;
import com.mansun.responseDto.user.VerifyPhoneNumResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "UserController", description = "사용자 정보의 CRUD를 담당하는 컨트롤러")
public class UserController {
    private final UserServiceImpl userService;

    @Operation(summary = "회원가입")
    @PostMapping
    public ResponseEntity<MessageResDto> createUser(@RequestBody CreateUserReqDto req) {
        //아무것도 추가하지 않고 헤더만 추가해서 간다.
        //만약 오류가 난다면 service 안에서 예외처리 반환 예정
        userService.createUser(req);
        return ResponseEntity.ok(new MessageResDto("회원가입 성공"));
    }

//    @Operation(summary = "카카오를 통한 회원가입")
//    @PostMapping
//    public ResponseEntity<OnlyMessageResDto> createUserbyKakao(@RequestBody CreateUserByKakaoReqDto req) {
//        //아무것도 추가하지 않고 헤더만 추가해서 간다.
//        //만약 오류가 난다면 service 안에서 예외처리 반환 예정
//        userService.createUserByKakao(req);
//        return ResponseEntity.ok(new OnlyMessageResDto("회원가입 성공"));
//    }

    @Operation(summary = "닉네임 설정")
    @PostMapping("/nickname/set")
    public ResponseEntity<MessageResDto> setNickname(@RequestBody SetNicknameReqDto req) {
        //아무것도 추가하지 않고 헤더만 추가해서 간다.
        //만약 오류가 난다면 service 안에서 예외처리 반환 예정
        userService.setNickname(req);
        return ResponseEntity.ok(new MessageResDto("닉네임을 정했습니다."));
    }

    // 로그인 과정의 대략적인 설명 : 해당 요청 mapping은 이곳에 있지 않다.
    // service의 loadbyusername과 common/auth/SecurityConfig 참고
    // Service에서는 우선 입력받은 email과 password를 이용해서 DB에서 사람을 찾는다.
    // 해당 사람을 찾을 경우는 CustomUserDetails란 이름으로 객체를 생성해서 그 안에 해당 유저를 넣으면 Security Logic 작동

    @Operation(summary = "회원 정보 변경")
    @PatchMapping
    public ResponseEntity<MessageResDto> updateUser(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody UpdateUserReqDto req) {
        userService.updateUser(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("회원 정보가 성공적으로 변경되었습니다."));
    }

    @Operation(summary = "회원정보 삭제")
    @DeleteMapping
    public ResponseEntity<MessageResDto> deleteUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        userService.deleteUser(customUserDetails.getUserId());
        return ResponseEntity.ok(new MessageResDto("회원 정보가 삭제되었습니다."));
    }


    //닉네임 중복 체크
    @Operation(summary = "닉네임 중복 확인")
    @GetMapping("/nickname/duplicate")
    public ResponseEntity<MessageResDto> checkDuplicateNickname(@RequestParam("nickname") String nickname) {
        userService.findByNickname(nickname);
        return ResponseEntity.ok(new MessageResDto("사용가능한 닉네임입니다."));
    }

    @Operation(summary = "내 정보 가져오기")
    @GetMapping("/me")
    public ResponseEntity<GetMyInfoResDto> getMyInformation(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(userService.findById(customUserDetails));
    }

    @Operation(summary = "타인의 정보 가져오기")
    @GetMapping("/other")
    public ResponseEntity<GetTheOtherOneInfoResDto> getTheOtherOneInformation(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("userId") Long req
    ) {
        return ResponseEntity.ok(userService.findTheOtherOneInfo(customUserDetails, req));
    }

    @Operation(summary = "팔로잉 리스트 가져오기")
    @GetMapping("/followings")
    public ResponseEntity<List<GetMyFollowingResDto>> getMyFollowingList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(userService.getMyFollowingFindById(customUserDetails));
    }

    @Operation(summary = "팔로워 리스트 가져오기")
    @GetMapping("/followers")
    public ResponseEntity<List<GetMyFollowerResDto>> getMyFollowerList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(userService.getMyFollowerFindById(customUserDetails));
    }

    @Operation(summary = "회원가입 email unique 특성을 위한 검증")
    @GetMapping("/verify/email")
    public ResponseEntity<VerifyEmailResDto> verifyEmail(
            @RequestParam("email") String email
    ) {
        return ResponseEntity.ok(userService.verifyEmail(email));
    }

    @Operation(summary = "회원가입 phoneNum unique 특성을 위한 검증")
    @GetMapping("/verify/phone_num")
    public ResponseEntity<VerifyPhoneNumResDto> verifyPhoneNum(
            @RequestParam("phone_num") String phoneNum
    ) {
        return ResponseEntity.ok(userService.verifyPhoneNumResDto(phoneNum));
    }

}