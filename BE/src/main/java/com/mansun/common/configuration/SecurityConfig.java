package com.mansun.common.configuration;

import com.mansun.common.auth.jwt.CustomLogoutFilter;
import com.mansun.common.auth.jwt.JwtFilter;
import com.mansun.common.auth.jwt.LoginFilter;
import com.mansun.common.auth.refresh.repository.RefreshRepository;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mansun.common.auth.jwt.JwtUtil;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

//    BCryptPasswordEncoder를 사용했으나 현재 가장 우수한 인코더는 Argon이다.
//    향후 바꿀 가능성이 있다.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //JWT를 통한 인증,인가를 위해서 세션을 STATELESS 상태로 설정하는 것이 중요하다.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //csrf disable
        http.csrf((auth) -> auth.disable());

        //Form 로그인 방식 disable
        http.formLogin(auth-> auth.disable());

        //http basic 인증 방식 disable
        http.httpBasic((auth) -> auth.disable());

        //경로별 인가 작업
        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers(/*Swagger의 설정이다 순서가 가장 앞에 있어야 하므로 주의*/
                        "/v3/api-docs/**").permitAll()
                .requestMatchers("/api/**"/*회원 가입 권한 허용*/).permitAll()
                .requestMatchers("/error").permitAll()
//                위의 /error는 개발 단계에서 에러 메시지를 그대로 보낸다. 운영 서버에서는 없어야 하는 것
                .anyRequest().authenticated());

        http.addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);
//        /api/users/login이란 경로로 ID를 email이란 input name으로 받는다고 설정
//        때문에 해당 경로는 /api/users에 있지 않다. 
//        로그인만을 위한 문이 있다고 이해하는 게 가장 빠르다
//        또한 email이란 input name으로 읽어오게 설정했다.
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,refreshRepository){{
            setFilterProcessesUrl("/api/users/login");
            setUsernameParameter("email");
        }}, UsernamePasswordAuthenticationFilter.class);

        http.addFilterAt(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);

        //세션 설정
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}