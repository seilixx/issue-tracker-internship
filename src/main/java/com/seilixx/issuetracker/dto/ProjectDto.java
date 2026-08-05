package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Issue;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private List<Issue> issues;
}
