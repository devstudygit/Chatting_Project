package com.example.contact.authentication.token.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class TokenRequest {
    private String username;
    private String password;
}
