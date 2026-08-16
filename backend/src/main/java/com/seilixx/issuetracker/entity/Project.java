package com.seilixx.issuetracker.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectCategory category;

    @ManyToOne
    @JoinColumn(name = "leader_id", nullable = false)
    private User leader;

    @OneToMany(mappedBy = "project" , cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Issue> issues;
}
