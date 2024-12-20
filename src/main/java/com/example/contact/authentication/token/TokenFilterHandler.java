package com.example.contact.authentication.token;

import com.example.contact.authentication.user.dto.UResponseDto;
import com.example.contact.authentication.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class TokenFilterHandler extends OncePerRequestFilter {
    private final TokenUtils tokenUtils;
    private final UserService userService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null){
            filterChain.doFilter(request, response);
            return;
        }

        String[] headSplit = header.split(" ");
        if (!(headSplit.length == 2 && headSplit[0].equals("Bearer"))){
            filterChain.doFilter(request, response);
            return;
        }

        String token = headSplit[1];
        String username = tokenUtils.parsetClaims(token).getSubject();
        UResponseDto user = (UResponseDto) userService.loadUserByUsername(username);

        SecurityContext context = SecurityContextHolder.createEmptyContext();

        AbstractAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        user.getPassword(),
                        user.getAuthorities()
                );
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        filterChain.doFilter(request, response);
    }
}
