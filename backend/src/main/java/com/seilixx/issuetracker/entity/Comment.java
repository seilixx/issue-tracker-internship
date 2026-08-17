package com.seilixx.issuetracker.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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

    // Nullable at the DB level (not just the Java default) so ddl-auto=update can add this
    // column to an existing table with rows, same pattern as the feature 10 columns (see HANDOFF.md §6).
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

}
