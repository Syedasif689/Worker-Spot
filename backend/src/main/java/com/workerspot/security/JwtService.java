package com.workerspot.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.workerspot.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final SecretKey secretKey;

    // =====================================================
    // TOKEN VALIDITY
    // =====================================================

    private final long jwtExpiration =
            24 * 60 * 60 * 1000L;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public JwtService(
            @Value("${jwt.secret}") String secret
    ) {

        this.secretKey =
                Keys.hmacShaKeyFor(
                        secret.getBytes()
                );
    }

    // =====================================================
    // GENERATE TOKEN
    // =====================================================

    public String generateToken(User user) {

        Date now =
                new Date();

        Date expiration =
                new Date(
                        now.getTime()
                                + jwtExpiration
                );

        return Jwts.builder()

                .subject(
                        user.getEmail()
                )

                .claim(
                        "userId",
                        user.getId()
                )

                .claim(
                        "role",
                        user.getRole().name()
                )

                .claim(
                        "fullName",
                        user.getFullName()
                )

                .issuedAt(now)

                .expiration(expiration)

                .signWith(secretKey)

                .compact();
    }

    // =====================================================
    // EXTRACT EMAIL
    // =====================================================

    public String extractEmail(
            String token
    ) {

        return extractAllClaims(token)
                .getSubject();
    }

    // =====================================================
    // EXTRACT ROLE
    // =====================================================

    public String extractRole(
            String token
    ) {

        return extractAllClaims(token)
                .get(
                        "role",
                        String.class
                );
    }

    // =====================================================
    // EXTRACT USER ID
    // =====================================================

    public Long extractUserId(
            String token
    ) {

        return extractAllClaims(token)
                .get(
                        "userId",
                        Long.class
                );
    }

    // =====================================================
    // VALIDATE TOKEN
    // =====================================================

    public boolean isTokenValid(
            String token
    ) {

        try {

            extractAllClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    // =====================================================
    // PARSE CLAIMS
    // =====================================================

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(
                        secretKey
                )

                .build()

                .parseSignedClaims(
                        token
                )

                .getPayload();
    }
}