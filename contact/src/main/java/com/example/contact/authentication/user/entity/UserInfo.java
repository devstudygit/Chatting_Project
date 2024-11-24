package com.example.contact.authentication.user.entity;

import com.example.contact.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user_account")
public class UserInfo extends BaseEntity {
    private String username;
    private String password;
    private String name;
    private String avatar;
    @ManyToMany(fetch = FetchType.LAZY)
    private final Set<Authority> authorities = new HashSet<>();
}
