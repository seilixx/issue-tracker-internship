package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private String username;

    private String mail;

    @OneToMany(mappedBy = "creator")
    private List<Issue> issuesCreated;

    @OneToMany(mappedBy = "assignee")
    private List<Issue> issuesAssigned;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;
}
