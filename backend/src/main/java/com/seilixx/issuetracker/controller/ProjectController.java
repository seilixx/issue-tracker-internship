package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.dto.ProjectUpdateRequest;
import com.seilixx.issuetracker.dto.UpdateCategoryRequest;
import com.seilixx.issuetracker.entity.ProjectCategory;
import com.seilixx.issuetracker.service.IssueService;
import com.seilixx.issuetracker.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<GenericType<List<ProjectDto>>> getProjects(
            @RequestParam(required = false) ProjectCategory category) {
        List<ProjectDto> projects = projectService.getProjects(category);
        GenericType<List<ProjectDto>> response = new GenericType<>(true, "here is the project list", projects);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericType<ProjectDto>> getProject(@PathVariable Long id) {
        ProjectDto projectDto = projectService.getProjectById(id);
        GenericType<ProjectDto> response = new GenericType<>(true, "Here is the project", projectDto);
        return ResponseEntity.ok(response);

    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<GenericType<ProjectDto>> createProject(@Valid @RequestBody ProjectDto projectDto) {
        ProjectDto projectCreated = projectService.createProject(projectDto);
        GenericType<ProjectDto> response = new GenericType<>(true, "here is the project created", projectCreated);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<GenericType<ProjectDto>> updateProject(@PathVariable Long id,
            @Valid @RequestBody ProjectUpdateRequest projectUpdateRequest) {
        ProjectDto projectUpdated = projectService.updateProject(id, projectUpdateRequest);
        GenericType<ProjectDto> response = new GenericType<>(true, "here is the project updated", projectUpdated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericType<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        GenericType<Void> response = new GenericType<>(true, "Project deleted", null);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/category")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericType<ProjectDto>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryRequest request) {
        ProjectDto updated = projectService.updateCategory(id, request.getCategory());
        GenericType<ProjectDto> response = new GenericType<>(true, "Category updated", updated);
        return ResponseEntity.ok(response);
    }
}
