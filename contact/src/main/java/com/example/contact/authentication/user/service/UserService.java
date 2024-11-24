package com.example.contact.authentication.user.service;

import com.example.contact.authentication.component.UserComponent;
import com.example.contact.authentication.user.dto.URequestDto;
import com.example.contact.authentication.user.dto.UResponseDto;
import com.example.contact.authentication.user.dto.UserDto;
import com.example.contact.authentication.user.entity.Authority;
import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.authentication.user.repo.AuthorityRepo;
import com.example.contact.authentication.user.repo.UserRepo;
import com.example.contact.exceptionHandler.CustomException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final UserComponent userComponent;
    private final AuthorityRepo authorityRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = userRepo.findByUsername(username).orElseThrow(
                ()-> new CustomException(HttpStatus.NOT_FOUND, "No exist username")
        );
        log.info(user.getId().toString());
        UserInfo userWithAuth = userRepo.userWithAuth(user.getId()).orElseThrow();
        return UResponseDto.dto(userWithAuth);
    }

    public UserDto register(URequestDto dto){
        if (userRepo.existsByUsername(dto.getUsername()))
            throw new CustomException(HttpStatus.BAD_REQUEST, "Username already exists!!");
        else if (!dto.getPassword().equals(dto.getCheckPw()))
            throw new CustomException(HttpStatus.BAD_REQUEST, "Passwords do not match!!");
        Authority roleUser = authorityRepo.findByRole("ROLE_USER").orElseThrow();
        UserInfo user = UserInfo.builder()
                .name(dto.getName())
                .username(dto.getUsername())
                .password(encoder.encode(dto.getPassword()))
                .avatar("/assets/user/user.png")
                .build();
        user.getAuthorities().add(roleUser);
        return UserDto.dto(userRepo.save(user));
    }

    public UserDto edit(URequestDto dto){
        UserInfo user = userComponent.userLogin();
        user.setName(dto.getName());
        return UserDto.dto(userRepo.save(user));
    }

    public UserDto changePw(URequestDto dto){
        if (!dto.getNewPw().equals(dto.getCheckPw()))
            throw new CustomException(HttpStatus.CONFLICT, "Confirm password does not match with password!!!");
        UserInfo user = userComponent.userLogin();
        if (!encoder.matches(dto.getPassword(), user.getPassword()))
            throw new CustomException(HttpStatus.CONFLICT, "Wrong current password!!!");
        if (dto.getPassword().equals(dto.getNewPw()))
            throw new CustomException(HttpStatus.BAD_REQUEST, "New password must be different with the old one!!");
        user.setPassword(encoder.encode(dto.getNewPw()));
        return UserDto.dto(user);
    }

    public UserDto login(){
        return UserDto.dto(userComponent.userLogin());
    }

    public UserDto uploadAvatar(MultipartFile image){
        UserInfo user = userComponent.userLogin();
        String directory = "profile/"+user.getId()+"/";
        try {
            Files.createDirectories(Path.of(directory));
        } catch(IOException e){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "Fail to create directory");
        }
        String fileName = image.getOriginalFilename();
        String[] eles = fileName.split("\\.");
        String extension = eles[eles.length-1];

        String path = directory + "avatar." +extension;
        try {
            image.transferTo(Path.of(path));
        } catch (IOException e){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "Fail to upload file");
        }

        String url = String.format("/static/%s/avatar.%s", user.getId(), extension);
        user.setAvatar(url);
        return UserDto.dto(userRepo.save(user));
    }

    public List<UserDto> allUser(){
        List<UserDto> list = new ArrayList<>();
        for (UserInfo user: userRepo.findAll()){
            if (!user.getId().equals(userComponent.userLogin().getId())){
                list.add(UserDto.dto(user));
            }
        }
        return list;
    }

    public UserDto receiver(Long id){
        return UserDto.dto(userComponent.userById(id));
    }
}
