package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;

    @NotBlank
    private String title;

    private String content;

    @NotNull
    private Long issueId;

    private String authorUuid;
    private String authorUserName;
    private LocalDateTime createdAt;
    private Long parentCommentId;
    private boolean deleted;

}
