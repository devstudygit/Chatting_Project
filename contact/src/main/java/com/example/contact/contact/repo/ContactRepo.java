package com.example.contact.contact.repo;

import com.example.contact.authentication.user.entity.UserInfo;
import com.example.contact.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContactRepo extends JpaRepository<Contact, Long> {
    @Query("SELECT DISTINCT c FROM Contact c WHERE " +
            "(c.sender = :user1 AND c.receiver = :user2) OR " +
            "(c.sender = :user2 AND c.receiver = :user1) " +
            "ORDER BY c.createAt ASC")
    List<Contact> chatBox(@Param("user1")UserInfo user1, @Param("user2")UserInfo user2);

    @Query("SELECT DISTINCT c FROM Contact c WHERE " +
            "c.receiver = :user AND " +
            "(c.status = \"Connecting\" OR c.status = \"OnCall\")")
    Optional<Contact> existCall(@Param("user") UserInfo receiver);

    @Query("SELECT COUNT (DISTINCT c) FROM Contact c WHERE " +
            "c.sender = :sender AND c.receiver = :receiver " +
            "AND c.status = \"Message\" AND c.confirm = false")
    Integer numOfMes(@Param("sender") UserInfo sender, @Param("receiver") UserInfo receiver);
    @Query("SELECT COUNT (DISTINCT c.sender) FROM Contact c WHERE " +
            "c.receiver = :receiver AND c.status = \"Message\" AND c.confirm = false")
    Integer numOfSender(@Param("receiver") UserInfo receiver);

}
