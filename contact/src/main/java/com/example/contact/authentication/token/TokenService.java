package com.example.contact.authentication.token;

import com.example.contact.authentication.component.UserComponent;
import com.example.contact.authentication.token.dto.TokenRequest;
import com.example.contact.authentication.token.dto.TokenResponse;
import com.example.contact.authentication.user.dto.UResponseDto;
import com.example.contact.authentication.user.service.UserService;
import com.example.contact.exceptionHandler.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenUtils tokenUtils;
    private final UserService userService;
    private final PasswordEncoder encoder;

    public TokenResponse getToken(TokenRequest dto){
        UResponseDto user = (UResponseDto) userService.loadUserByUsername(dto.getUsername());
        if (!encoder.matches(dto.getPassword(), user.getPassword())){
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Wrong password!!!");
        }
        TokenResponse response = TokenResponse.builder()
                .token(tokenUtils.generateToken(dto.getUsername()))
                .build();
        return response;
    }
    public boolean validate(String token){
        return tokenUtils.validate(token);
    }

}
