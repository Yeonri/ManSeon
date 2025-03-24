package com.mansun.features.user;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.features.user.service.UserServiceImpl;
import com.mansun.requestDto.user.CreateUserReqDto;
import com.mansun.requestDto.user.UpdateUserReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "UserController",description = "사용자 정보의 CRUD를 담당하는 컨트롤러")
public class UserController {

    private final UserServiceImpl userService;

    @Operation(summary = "회원가입")
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody CreateUserReqDto req) {
        //아무것도 추가하지 않고 헤더만 추가해서 간다.
        //만약 오류가 난다면 service 안에서 예외처리 반환 예정
        userService.createUser(req);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인 과정의 대략적인 설명 : 해당 요청 mapping은 이곳에 있지 않다.
    // service의 loadbyusername 참고
    // Service에서는 우선 입력받은 email과 password를 이용해서 DB에서 사람을 찾는다.
    // 해당 사람을 찾을 경우는 CustomUserDetails란 이름으로 객체를 생성해서 그 안에 해당 유저를 넣으면 Security Logic 작동

    @Operation(summary = "회원 정보 변경")
    @PatchMapping
    public ResponseEntity<String> updateUser(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody UpdateUserReqDto req){
        Users user=userService.updateUser(customUserDetails,req);
        return ResponseEntity.ok("회원 정보가 성공적으로 변경되었습니다.");
    }

    @Operation(summary = "회원정보 삭제")
    @DeleteMapping
    public ResponseEntity<String> deleteUser(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        userService.deleteUser(customUserDetails.getUserId());
        return ResponseEntity.ok("회원 정보가 삭제되었습니다.");
    }
    

    //닉네임 중복 체크
    @Operation(summary = "닉네임 중복 확인")
    @GetMapping("/nickname/duplicate")
    public ResponseEntity<String> checkDuplicateNickname(@RequestParam("nickname")String nickname){
        userService.findByNickname(nickname);
        return ResponseEntity.ok("사용가능한 닉네임입니다.");
    }
}