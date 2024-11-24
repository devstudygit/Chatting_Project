package com.example.contact.authentication.token;

import com.example.contact.authentication.token.dto.TokenRequest;
import com.example.contact.authentication.token.dto.TokenResponse;
import com.example.contact.authentication.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("token")
public class TokenController {
    private final TokenService tokenService;
    @PostMapping
    public TokenResponse getToken(@RequestBody TokenRequest request){
        return tokenService.getToken(request);
    }

    @GetMapping
    public boolean validate(@RequestParam String token){
        return tokenService.validate(token);
    }
}
