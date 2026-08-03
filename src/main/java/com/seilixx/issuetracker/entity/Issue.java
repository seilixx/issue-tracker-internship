package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;

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

@ManyToOne
@JoinColumn(name = "project_id")
    private Project project;

@ManyToOne
@JoinColumn(name = "creator_id")
    private User creator;

@ManyToOne
@JoinColumn(name = "assignee_id")
    private User assignee;

@OneToMany(mappedBy = "issue")
    List<Comment> comments;
}
