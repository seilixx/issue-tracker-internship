package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * Request body for PUT /api/issues/{id}. Deliberately has no {@code status} field:
 * status transitions go through PATCH /api/issues/{id}/status instead, which is the only
 * place that enforces the closed-issue-is-terminal rule.
 */
@Data
public class IssueUpdateRequest {

    @NotBlank(message = "title necessary")
    private String title;

    private String description;

    @NotNull(message = "priority necessary")
    private Priority priority;

    @NotNull(message = "project necessary")
    private Long projectId;

    private List<String> assignedUuids;
}
