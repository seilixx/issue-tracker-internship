package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentCreateRequest {

    @NotBlank(message = "title necessary")
    private String title;

    private String content;

    private Long parentCommentId;
}
