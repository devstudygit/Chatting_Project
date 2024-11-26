package com.example.contact.authentication.user.oauth2;

import com.example.contact.authentication.user.dto.UResponseDto;
import com.example.contact.authentication.user.entity.Authority;
import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.authentication.user.repo.AuthorityRepo;
import com.example.contact.authentication.user.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class KakaoService extends DefaultOAuth2UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final AuthorityRepo authorityRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        String password = oAuth2User.getAttributes().get("id").toString();
        String username = profile.get("nickname").toString();
        String email = kakaoAccount.get("email").toString();
        String name = kakaoAccount.get("name").toString();
        UserInfo user;
        if (userRepo.existsByUsername(username)){
            user = userRepo.findByUsername(username).orElseThrow();
        } else{
            user = UserInfo.builder()
                    .username(email)
                    .name(name)
                    .password(encoder.encode(password))
                    .avatar("/assets/user/user.png")
                    .build();
            Authority roleUser = authorityRepo.findByRole("ROLE_USER").orElseThrow();
            user.getAuthorities().add(roleUser);
            userRepo.save(user);
        }
        UserInfo userEntity = userRepo.userWithAuth(user.getId()).orElseThrow();
        UResponseDto response = UResponseDto.dto(userEntity);
        Map<String, Object> attributes = response.getAttributes();
        attributes.put("provider", "kakao");
        return new DefaultOAuth2User(
                response.getAuthorities(),
                attributes,
                "username"
        );
    }
}
