package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private String username;

    private String mail;
    private String password;

    @OneToMany(mappedBy = "creator")
    private List<Issue> issuesCreated;

    @ManyToOne
    @JoinColumn(name = "issue_assignee")
    private Issue issueAssigned;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public Collection getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
