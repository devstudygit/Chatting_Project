package com.example.contact.authentication.user.entity;

import com.example.contact.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Authority extends BaseEntity {
    private String role;

    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
    private final Set<UserInfo> users= new HashSet<>();
}
