package com.example.contact.authentication.token;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenOAuth2Handler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenUtils tokenUtils;
    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        String token = tokenUtils.generateToken(authentication.getName());
        String targetUrl = String.format(
                "http://localhost:3000/login?token=" + token
        );
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
