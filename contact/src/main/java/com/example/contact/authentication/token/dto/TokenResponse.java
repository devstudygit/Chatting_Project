package com.example.contact.authentication.token.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class TokenResponse {
    private String token;
}
