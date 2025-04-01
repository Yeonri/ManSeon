package com.mansun.common.auth.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mansun.common.auth.KakaoInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Controller
@RequiredArgsConstructor
public class oAuthController {
    //    http://kauth.kakao.com/oauth/authorize?client_id=4df41bec6f36ccdec491270265b88e43&redirect_uri=http://localhost:8080/auth/callback&response_type=code
//    이 시점의 시작점이 바로 인가 코드 받아오기다
    private String clientId = "4df41bec6f36ccdec491270265b88e43";
    private String redirectUri = "http://localhost:8080/oauth/callback";
    private String clientSecret;
//    private String accessToken=null;

    //이 메소드는 Kakao 로그인의 첫 시도를 위해 카카오 로그인을 위한 URl을 Client로 내려주ㅜㄴ다
    @GetMapping("/oauth2/authorization/kakao")
    public String callback() {
        StringBuilder url = new StringBuilder("http://kauth.kakao.com/oauth/authorize");
        url.append("?client_id=" + clientId)
                .append("&redirect_uri=" + redirectUri)
                .append("&response_type=" + "code");

        System.out.println(url);
        return null;//"redirect:"+url.toString();
    }

    //Redirect되어 카카오에서 로그인이 성공했을 경우 Redirect URI?code=???????의 형식으로 보여지게 된다.
    //이 코드가 바로 인가 코드이다.
    @GetMapping("/login/oauth2/code/kakao")
    public String getAccessToken(@RequestParam("code") String code) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);
        body.add("client_secret", clientSecret);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        System.out.println("access token 값 : " + jsonNode.get("access_token").asText());
        return jsonNode.get("access_token").asText();
    }

    public KakaoInfo getKakaoInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        // responseBody에 있는 정보 꺼내기
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        Long id = jsonNode.get("id").asLong();
        String email = jsonNode.get("kakao_account").get("email").asText();
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();

        return new KakaoInfo(id, nickname, email);
    }
}
