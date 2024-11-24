package com.example.contact.authentication.user;

import com.example.contact.authentication.user.dto.URequestDto;
import com.example.contact.authentication.user.dto.UResponseDto;
import com.example.contact.authentication.user.dto.UserDto;
import com.example.contact.authentication.user.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public UserDto register(@RequestBody URequestDto dto){
        return userService.register(dto);
    }

    @GetMapping
    public UserDto login(){
        return userService.login();
    }

    @GetMapping("{userId}")
    public UserDto receiver(@PathVariable("userId") Long userId){
        return userService.receiver(userId);
    }

    @PutMapping
    public UserDto edit(@RequestBody URequestDto dto){
        return userService.edit(dto);
    }
    @PutMapping("password")
    public UserDto changePw(@RequestBody URequestDto dto){
        return userService.changePw(dto);
    }
    @PutMapping("avatar")
    public UserDto uploadAvatar(
            @RequestParam("avatar") MultipartFile avatar
    ){
        return userService.uploadAvatar(avatar);
    }

    @GetMapping("all")
    public List<UserDto> listUser(){
        return userService.allUser();
    }
}
