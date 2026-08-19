package com.workerspot.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.workerspot.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)

            .cors(cors -> cors.configurationSource(
                corsConfigurationSource()
            ))

            .authorizeHttpRequests(auth -> auth

    // =========================================
    // PUBLIC AUTH APIs
    // =========================================

    .requestMatchers(
        "/api/health",
        "/api/auth/register/customer",
        "/api/auth/register/worker",
        "/api/auth/login"
    ).permitAll()

    // =========================================
    // CORS PREFLIGHT
    // =========================================

    .requestMatchers(
        HttpMethod.OPTIONS,
        "/**"
    ).permitAll()

    // =========================================
    // CUSTOMER APIs
    // =========================================

    .requestMatchers(
        "/api/customers/**"
    ).hasRole("CUSTOMER")

    // =========================================
    // NEARBY WORKER SEARCH
    // CUSTOMER + WORKER CAN SEARCH
    // =========================================

    .requestMatchers(
        "/api/workers/nearby"
    ).hasAnyRole("CUSTOMER", "WORKER")

    // =========================================
    // WORKER APIs
    // =========================================

    .requestMatchers(
        "/api/workers/**"
    ).hasRole("WORKER")

    // =========================================
    // EVERYTHING ELSE
    // =========================================

    .anyRequest().authenticated()
)

            // =============================================
            // JWT FILTER
            // =============================================

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "https://worker-spot.vercel.app"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "PATCH",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}