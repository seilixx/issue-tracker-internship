package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Priority;
import com.seilixx.issuetracker.entity.Status;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class IssueDto {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private Priority priority;
    private Long projectId;
    private Long creatorId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private List<Long> assignedIds;
}
