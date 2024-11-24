package com.example.contact.authentication.user.service;

import com.example.contact.authentication.user.entity.Authority;
import com.example.contact.authentication.user.repo.AuthorityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class AuthorityService {
    private final AuthorityRepo authorityRepo;
    public static String[] authorities = {"ROLE_USER", "ROLE_ADMIN"};

    public AuthorityService(AuthorityRepo authorityRepo) {
        this.authorityRepo = authorityRepo;
        for (String role: authorities){
            if (!authorityRepo.existsByRole(role)){
                authorityRepo.save(
                        Authority.builder()
                                .role(role).build()
                );
            }
        }
    }
}
