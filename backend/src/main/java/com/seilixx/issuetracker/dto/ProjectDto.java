package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.ProjectCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDto {
    private Long id;

    @NotBlank(message = "title necessary")
    private String title;
    private String description;

    @NotNull(message = "category necessary")
    private ProjectCategory category;

    @NotBlank(message = "leader necessary")
    private String leaderUuid;

    private List<IssueDto> issues;
}
