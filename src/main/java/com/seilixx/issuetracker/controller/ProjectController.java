package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.service.IssueService;
import com.seilixx.issuetracker.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<GenericType<List<ProjectDto>>> getProjects() {
        List<ProjectDto> projects = projectService.getProjects();
        GenericType<List<ProjectDto>> response = new GenericType<>(true,"here is the project list",projects);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable long id){
        return projectService.getProjectById(id);
    }
}
