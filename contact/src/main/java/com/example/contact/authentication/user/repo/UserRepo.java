package com.example.contact.authentication.user.repo;

import com.example.contact.authentication.user.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<UserInfo, Long> {
    @Query("SELECT DISTINCT u FROM UserInfo u JOIN FETCH u.authorities WHERE u.id= :id")
    Optional<UserInfo> userWithAuth(Long id);

    Optional<UserInfo> findByUsername(String username);
    boolean existsByUsername(String username);
}
