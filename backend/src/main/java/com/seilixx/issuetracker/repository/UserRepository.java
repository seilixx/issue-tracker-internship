package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByMail(String mail);
    Optional<User> findByUuid(String uuid);
    boolean existsByUsername(String username);
    boolean existsByMail(String mail);

    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.mail) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<User> search(@Param("query") String query, Pageable pageable);
}


