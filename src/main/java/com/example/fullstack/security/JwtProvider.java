package com.example.fullstack.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Component // 제어의 역전을 통한 의존성 주입을 위해 사용
public class JwtProvider {

    /*
        1. userId 을 받아와서 jwt 로 만들어준다.
        2. 토큰 만료 기간 설정 (expiredDate)
        3. jwt 생성
    */
    private final Key key;

    public JwtProvider() {
        // 안전한 키 생성
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String createJwt(String userId) {
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // 생성된 키를 사용하여 JWT 생성
        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    public String validate(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key) // 생성된 키를 사용하여 검증
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new CustomException("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        } catch (JwtException e) {
            throw new CustomException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        }
    }
}