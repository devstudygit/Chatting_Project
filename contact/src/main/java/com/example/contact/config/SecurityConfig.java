package com.example.contact.config;

import com.example.contact.authentication.token.TokenFilterHandler;
import com.example.contact.authentication.token.TokenUtils;
import com.example.contact.authentication.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {
    private final TokenUtils tokenUtils;
    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->{
                    auth.requestMatchers(HttpMethod.POST, "/users").permitAll();
                    auth.requestMatchers("/token/**", "/static/**", "/ws", "/topic", "/app").permitAll();
//                    auth.requestMatchers("/users/**").authenticated();
                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(
                        new TokenFilterHandler(tokenUtils, userService),
                        AuthorizationFilter.class
                );

        return http.build();
    }
}
