package com.mansun.be.common.auth.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
	//환경 변수 .yml에서 JWT의 Secret Key를 불러온다.
    private SecretKey secretKey;
    public JwtUtil(@Value("${spring.jwt.secret}") String secret){
        this.secretKey=new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    //Token을 변환해서 username이라고 쓰여있는 부분을 읽어낸다.
    public String getEmail(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email",String.class);
    }

    //Token을 변환해서 userId라고 쓰여있는 부분을 읽어낸다.
    public String getuserId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", String.class);
    }

    public String getCategory(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }
  
    //Token을 변환해서 유효기간이 지났는지 확인한다.
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    //JWT Token을 생성한다.
    public String createJwt(String category,String email, String userId, Long expiredMs) {
        return Jwts.builder()
                .claim("category",category)
                .claim("email", email)
                .claim("userId", userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
}
