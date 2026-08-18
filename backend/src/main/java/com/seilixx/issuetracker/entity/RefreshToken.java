package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Opaque random string, not a signed JWT: it never needs to be verified
    // client-side, only looked up server-side, so there's nothing a signature
    // would buy here — and storing it lets a single row be revoked (logout,
    // rotation) which a stateless long-lived JWT could not be.
    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Column(nullable = false)
    private boolean revoked = false;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
