package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Request body for PUT /api/projects/{id}. Deliberately has no {@code category} field:
 * category changes go through the admin-only PATCH /api/projects/{id}/category endpoint
 * instead, so a manager editing a project can never touch it, even by accident.
 */
@Data
public class ProjectUpdateRequest {

    @NotBlank(message = "title necessary")
    private String title;

    private String description;

    @NotBlank(message = "leader necessary")
    private String leaderUuid;
}
