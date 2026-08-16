package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Priority;
import com.seilixx.issuetracker.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class IssueDto {
    private Long id;

    @NotBlank(message = "title necessary")
    private String title;

    private String description;

    private Status status;

    @NotNull(message = "priority necessary")
    private Priority priority;

    @NotNull(message = "project necessary")
    private Long projectId;

    private String creatorUuid;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private String closedByUuid;
    private List<String> assignedUuids;

    private List<CommentDto> comments;
    private List<AttachmentDto> attachments;
}
