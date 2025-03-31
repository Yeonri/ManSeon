package com.mansun.features.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mansun.common.auth.KakaoInfo;
import com.mansun.common.utils.JwtUtil;
import com.mansun.entity.Users;
import com.mansun.features.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl {
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String tokenUri;
    //    private String clientSecret;
    @Setter
    private String accessToken = null;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;


    public Map<String,String> kakaoLoginCallbackService(String code) throws JsonProcessingException {
        // (1) 액세스 토큰 요청
        String accessToken = requestAccessToken(code);
        System.out.println("accessToken 요청 성공 : ");

        // (2) 사용자 정보 요청
        KakaoInfo kakaoInfo = getKakaoInfo(accessToken);
        System.out.println("사용자 정보 요청 성공" + kakaoInfo.toString());

        // (3) DB에서 회원 조회 or 신규 가입
        Optional<Users> existingUser = userRepository.findByNicknameAndEmail(kakaoInfo.getNickname(), kakaoInfo.getEmail());
        Users user;
        //DB에 유저 정보가 있다면 정보를 가져오고 없다면 신규 가입
        user = existingUser.orElseGet(
                () -> userRepository.save(Users.builder()
//                        .kakaoId(kakaoInfo.getId())
                        .userId(kakaoInfo.getUserId())
                        .email(kakaoInfo.getEmail())
                        .nickname(kakaoInfo.getNickname())
                        .build()));
        System.out.println("DB 조회 성공" + user.toString());

//      (4) JWT Token 생성 후 반환
        String access = jwtUtil
                .createJwt("access", user.getEmail(), String.valueOf(user.getUserId()), 86400000L);
        String refresh = jwtUtil
                .createJwt("refresh", user.getEmail(), String.valueOf(user.getUserId()), 604800000L); // 7일

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("accessToken", access);
        tokenMap.put("refreshToken", refresh);
        return tokenMap;
    }
    /**
     * =========================================
     * A) 받은 인가코드로 Access Token 요청하기
     * =========================================
     */
    private String requestAccessToken(String code) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // 1. 요청 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 2. 요청 바디(파라미터)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        // 3. HttpEntity 생성
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        // 4. 카카오에 POST 요청
        ResponseEntity<String> response = restTemplate.postForEntity(
                tokenUri, // https://kauth.kakao.com/oauth/token
                requestEntity,
                String.class
        );

        // 5. JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response.getBody());
        // 응답 예시: { "access_token":"~~~", "token_type":"bearer", ... }
        return rootNode.get("access_token").asText();
    }

    /**
     * =========================================
     * B) 액세스 토큰으로 카카오 유저 정보 가져오기
     * =========================================
     */
    private KakaoInfo getKakaoInfo(String accessToken) throws JsonProcessingException {
        RestTemplate rt = new RestTemplate();

        // 1. 요청 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 2. HttpEntity
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);

        // 3. 사용자 정보 요청
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        // 4. JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());

        // (예시) { "id":1234567890, "kakao_account":{"email":"..."},"properties":{"nickname":"..."} }
//        Long id = jsonNode.get("id").asLong();
        String email = null;
        if (jsonNode.get("kakao_account") != null && jsonNode.get("kakao_account").has("email")) {
            email = jsonNode.get("kakao_account").get("email").asText();
        }
        String nickname = null;
        if (jsonNode.get("properties") != null && jsonNode.get("properties").has("nickname")) {
            nickname = jsonNode.get("properties").get("nickname").asText();
        }

        return new KakaoInfo(nickname, email);
    }
}
