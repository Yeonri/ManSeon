package com.mansun.common.auth.oauth;

import com.mansun.common.auth.oauth.response.GoogleResponse;
import com.mansun.common.auth.oauth.response.KakaoResponse;
import com.mansun.common.auth.oauth.response.NaverResponse;
import com.mansun.common.auth.oauth.response.OAuth2Response;
import com.mansun.entity.Users;
import com.mansun.features.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        if (oAuth2User == null || oAuth2User.getAttributes() == null) {
            throw new OAuth2AuthenticationException("OAuth2 사용자 정보를 불러올 수 없습니다.");
        }

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        System.out.println("OAuth2 Provider: " + registrationId);
        System.out.println(oAuth2User.getAttributes().toString());

        OAuth2Response oAuth2Response;

        if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다: " + registrationId);
        }

        // 사용자 저장 또는 조회
        Users user = userRepository.findByEmailAndDeletedFalse(oAuth2Response.getEmail())
                .orElseGet(() -> {
                    Users newUser = new Users();
                    newUser.setEmail(oAuth2Response.getEmail());
                    newUser.setUsername(oAuth2Response.getName());
                    newUser.setNickname(oAuth2User.getName()); // provider에서 주는 nickname
                    // newUser.setRole("ROLE_USER"); // 필요한 경우 추가
                    return userRepository.save(newUser);
                });

        // DTO 생성
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getUsername());
        userDTO.setRole("ROLE_USER");

        return new CustomOAuth2User(userDTO);
    }
}
