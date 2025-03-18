package com.mansun.features.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/auth")
public class authController {

//      http://kauth.kakao.com/oauth/authorize
//      ?client_id=4df41bec6f36ccdec491270265b88e43
//      &redirect_uri=http://localhost:8080/auth/callback
//      &response_type=code
//    이 시점의 시작점이 바로 인가 코드 받아오기다
    @GetMapping("/callback")
    public ResponseEntity<String> callback(@PathVariable("code") String code/*인가코드 받아왔다*/){

        return ResponseEntity.ok(code);
    }
//    https://kauth.kakao.com/oauth/authorize
}
