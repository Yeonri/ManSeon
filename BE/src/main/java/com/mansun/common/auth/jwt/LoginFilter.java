package com.mansun.common.auth.jwt;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.common.auth.refresh.Entity.RefreshEntity;
import com.mansun.common.auth.refresh.repository.RefreshRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshRepository refreshRepository;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //클라이언트 요청에서 Email(Spring Security에서는 ID를 username이라고 명명), password 추출
        String email = obtainUsername(request);
        String password = obtainPassword(request);

        System.out.println("email과 password의 추출 내용" + email + " " + password);

        //스프링 시큐리티에서 email과 password를 검증하기 위해서는 UsernamePasswordAuthenticationToken에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String email = customUserDetails.getUsername(); // username은 email로 사용됨
        String userId = String.valueOf(customUserDetails.getUserId());

        String accessToken = jwtUtil.createJwt("access", email, userId,  7L * 24 * 60 * 60 * 1000);
        String refreshToken = jwtUtil.createJwt("refresh", email, userId,  7L * 24 * 60 * 60 * 1000);

        // DB에 refreshToken 저장
        addRefreshEntity(email, refreshToken, 86400000L);

        // JSON 응답 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        // JSON 형태로 응답 작성
        String jsonResponse = String.format(
                "{ \"accessToken\": \"%s\", \"refreshToken\": \"%s\" }",
                accessToken, refreshToken
        );

        try {
            response.getWriter().write(jsonResponse);
        } catch (IOException e) {
            throw new RuntimeException("토큰 응답 중 오류 발생", e);
        }
    }


    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//
//        //customUserDetails에서 email을 읽어낸다.(customUserDetails에서 왜 username으로 email 읽는지 설명)
//        String email = customUserDetails.getUsername();
//        //customUserDetails에서 userId를 읽어내 문자열로 변환한다.
//        String userId = String.valueOf(customUserDetails.getUserId());
//
////        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
////        Iterator<? extends GrantedAuthority> Iterator=authorities.iterator();
////        GrantedAuthority auth=Iterator.next();
////        String role=auth.getAuthority();
//
//        String accessToken = jwtUtil.createJwt("access", email, userId, 60 * 60 * 60 * 10L);
//        String refreshToken = jwtUtil.createJwt("refresh", email, userId, 60 * 60 * 60 * 60 * 60 * 10L);
//
//        addRefreshEntity(email,refreshToken,86400000L);
//
//        response.setHeader("Authorization", "Bearer "+accessToken);
//        response.addCookie(createCookie("refresh", refreshToken));
//        response.setStatus(HttpStatus.OK.value());
//    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

    private void addRefreshEntity(String email, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setEmail(email);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);
    }
}