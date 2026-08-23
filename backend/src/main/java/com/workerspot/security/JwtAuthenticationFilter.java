package com.workerspot.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(
            JwtService jwtService
    ) {
        this.jwtService = jwtService;
    }

    @Override
    protected boolean shouldNotFilter(
            HttpServletRequest request
    ) {

        String path = request.getServletPath();

        return path.equals("/api/auth/login")
                || path.equals("/api/auth/register/customer")
                || path.equals("/api/auth/register/worker");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        // =================================================
        // DEBUG
        // =================================================

        System.out.println(
                "========================================"
        );

        System.out.println(
                "JWT REQUEST: "
                        + request.getMethod()
                        + " "
                        + request.getRequestURI()
        );

        System.out.println(
                "AUTH HEADER PRESENT: "
                        + (authHeader != null)
        );

        // =================================================
        // NO TOKEN
        // =================================================

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            System.out.println(
                    "NO JWT TOKEN FOUND"
            );

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String token =
                authHeader.substring(7).trim();

        try {

            // =================================================
            // EXTRACT JWT DATA
            // =================================================

            String email =
                    jwtService.extractEmail(token);

            String role =
                    jwtService.extractRole(token);

            System.out.println(
                    "JWT EMAIL: " + email
            );

            System.out.println(
                    "JWT ROLE: " + role
            );

            // =================================================
            // VALIDATE TOKEN
            // =================================================

            if (email != null
                    && role != null
                    && jwtService.isTokenValid(token)
                    && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                String normalizedRole =
                        role.trim().toUpperCase();

                // Prevent ROLE_ROLE_WORKER
                if (normalizedRole.startsWith("ROLE_")) {

                    normalizedRole =
                            normalizedRole.substring(5);
                }

                SimpleGrantedAuthority authority =
                        new SimpleGrantedAuthority(
                                "ROLE_" + normalizedRole
                        );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of(authority)
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authentication
                        );

                System.out.println(
                        "JWT AUTHENTICATION SUCCESS"
                );

                System.out.println(
                        "AUTHORITY: ROLE_"
                                + normalizedRole
                );

            } else {

                System.out.println(
                        "JWT VALIDATION FAILED"
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT AUTHENTICATION FAILED: "
                            + e.getMessage()
            );

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(
                request,
                response
        );

        System.out.println(
                "========================================"
        );
    }
}