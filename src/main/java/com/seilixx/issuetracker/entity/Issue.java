package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

import java.util.List;

@Entity
@Data
public class Issue {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

private String title;

private String description;

@Enumerated(EnumType.STRING)
    private Status status;

@Enumerated(EnumType.STRING)
    private Priority priority;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime closedAt;

@ManyToOne
@JoinColumn(name = "project_id")
    private Project project;

@ManyToOne
@JoinColumn(name = "creator_id")
    private User creator;

    @ManyToMany
    @JoinTable(
            name = "issue_assignees",
            joinColumns = @JoinColumn(name = "issue_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> assignees;

@OneToMany(mappedBy = "issue", cascade = CascadeType.ALL , orphanRemoval = true)
    List<Comment> comments;
}
