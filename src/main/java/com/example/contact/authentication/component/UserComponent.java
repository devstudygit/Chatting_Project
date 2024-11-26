package com.example.contact.authentication.component;

import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.authentication.user.oauth2.NaverService;
import com.example.contact.authentication.user.repo.UserRepo;
import com.example.contact.exceptionHandler.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserComponent {
    private final UserRepo userRepo;
    private final NaverService naverService;
    public UserInfo userLogin(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserInfo userInfo = userRepo.findByUsername(username).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist username!!!")
        );
        return userRepo.userWithAuth(userInfo.getId()).orElseThrow();
    }

    public UserInfo userById(Long id){
        return userRepo.findById(id).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist username!!!")
        );
    }
}
