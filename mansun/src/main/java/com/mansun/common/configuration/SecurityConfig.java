package com.mansun.common.configuration;

import com.mansun.common.auth.jwt.JwtFilter;
import com.mansun.common.auth.jwt.LoginFilter;
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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

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
                .anyRequest().authenticated());

        http.addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);
//        /api/users/login이란 경로로 ID를 email이란 input name으로 받는다고 설정
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil){{
            setFilterProcessesUrl("/api/users/login");
            setUsernameParameter("email");
        }}, UsernamePasswordAuthenticationFilter.class);


        //세션 설정
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}