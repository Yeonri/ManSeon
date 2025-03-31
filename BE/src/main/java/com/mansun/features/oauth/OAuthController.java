package com.mansun.features.oauth;

import com.mansun.features.oauth.service.OAuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth2")
public class OAuthController {
    //    http://kauth.kakao.com/oauth/authorize?client_id=4df41bec6f36ccdec491270265b88e43&redirect_uri=http://localhost:8080/auth/callback&response_type=code
//    이 시점의 시작점이 바로 인가 코드 받아오기다
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    private final OAuthServiceImpl oAuthService;

//    https://devtalk.kakao.com/t/code-challenge-code-verifier/136785/2 ㅈ같다

    //이 메소드는 Kakao 로그인의 첫 시도를 위해 카카오 로그인을 위한 URl을 Client로 내려준다
    @GetMapping("/kakao")
    public ResponseEntity<String> redirectForKakaoLogin() {
        // ex) https://kauth.kakao.com/oauth/authorize?client_id=xxx&redirect_uri=xxx&response_type=code
        StringBuilder url = new StringBuilder("https://kauth.kakao.com/oauth/authorize");
        url.append("?client_id=").append(clientId)
                .append("&redirect_uri=").append(redirectUri)
                .append("&response_type=code");
        return ResponseEntity.ok(url.toString());
    }

    /**
     * 2) callback: 카카오에서 인가코드를 받아 액세스 토큰 + 사용자 정보를 가져오고
     * 필요한 DB 저장/처리를 한 뒤, 응답 DTO 반환
     */
    @GetMapping("/callback")
    public ResponseEntity<String> kakaoLoginCallback(@RequestParam("code") String code) {
        try {
            System.out.println("최초 진입");

            Map<String, String> tokens = oAuthService.kakaoLoginCallbackService(code);
            String accessToken = tokens.get("accessToken");
            String refreshToken = tokens.get("refreshToken");
            System.out.println("Access " + accessToken + " Refresh " + refreshToken);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);

            // 쿠키로 RefreshToken 설정 (보안 위해 HttpOnly & Secure 권장)
            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
//                    .secure(true)
//                    .path("/")
                    .maxAge(604800) // 7일
//                    .sameSite("None") // 또는 Lax, Strict, depending on your setup
                    .build();
            headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body("Bearer " + accessToken);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping("/logout")
//    public ResponseEntity<String> logout(@RequestParam("userId") Long userId) {
//        accessTokenRepository.deleteByUserId(userId);
//        return ResponseEntity.ok("로그아웃 완료: 해당 사용자의 AccessToken 삭제");
//    }

//    private String requestAccessToken(String code) throws JsonProcessingException {
//        RestTemplate restTemplate = new RestTemplate();
//
//        // 1. 요청 헤더
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        // 2. 요청 바디(파라미터)
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", clientId);
//        params.add("redirect_uri", redirectUri);
//        params.add("code", code);
//
//        // 3. HttpEntity 생성
//        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
//
//        // 4. 카카오에 POST 요청
//        ResponseEntity<String> response = restTemplate.postForEntity(
//                tokenUri, // https://kauth.kakao.com/oauth/token
//                requestEntity,
//                String.class
//        );
//
//        // 5. JSON 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode rootNode = objectMapper.readTree(response.getBody());
//        // 응답 예시: { "access_token":"~~~", "token_type":"bearer", ... }
//        return rootNode.get("access_token").asText();
//    }
//
//    /** =========================================
//     * B) 액세스 토큰으로 카카오 유저 정보 가져오기
//     * ========================================= */
//    private KakaoInfo getKakaoInfo(String accessToken) throws JsonProcessingException {
//        RestTemplate rt = new RestTemplate();
//
//        // 1. 요청 헤더
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + accessToken);
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        // 2. HttpEntity
//        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
//
//        // 3. 사용자 정보 요청
//        ResponseEntity<String> response = rt.exchange(
//                "https://kapi.kakao.com/v2/user/me",
//                HttpMethod.POST,
//                kakaoUserInfoRequest,
//                String.class
//        );
//
//        // 4. JSON 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readTree(response.getBody());
//
//        // (예시) { "id":1234567890, "kakao_account":{"email":"..."},"properties":{"nickname":"..."} }
////        Long id = jsonNode.get("id").asLong();
//        String email = null;
//        if (jsonNode.get("kakao_account") != null && jsonNode.get("kakao_account").has("email")) {
//            email = jsonNode.get("kakao_account").get("email").asText();
//        }
//        String nickname = null;
//        if (jsonNode.get("properties") != null && jsonNode.get("properties").has("nickname")) {
//            nickname = jsonNode.get("properties").get("nickname").asText();
//        }
//
//        return new KakaoInfo(nickname, email);
//    }
}
