package com.seilixx.issuetracker.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Comment  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "author_user_id")
    private User authorUser;

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @Column(nullable = false)
    private boolean deleted = false;

}
