package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.service.IssueService;
import com.seilixx.issuetracker.service.ProjectService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<GenericType<List<ProjectDto>>> getProjects() {
        List<ProjectDto> projects = projectService.getProjects();
        GenericType<List<ProjectDto>> response = new GenericType<>(true, "here is the project list", projects);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericType<ProjectDto>> getProject(@PathVariable Long id) {
        ProjectDto projectDto = projectService.getProjectById(id);
        GenericType<ProjectDto> response = new GenericType<>(true,"Here is the project",projectDto);
        return ResponseEntity.ok(response);

    }

    @PostMapping
    public ResponseEntity<GenericType<ProjectDto>> createProject(@RequestBody ProjectDto projectDto) {
        ProjectDto projectCreated = projectService.createProject(projectDto);
        GenericType<ProjectDto> response = new GenericType<>(true, "here is the project created", projectCreated);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GenericType<ProjectDto>> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        ProjectDto projectUpdated = projectService.updateProject(id, projectDto);
        GenericType<ProjectDto> response = new GenericType<>(true, "here is the project updated", projectUpdated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericType<Void>> deleteProject(@PathVariable Long id) {
         projectService.deleteProject(id);
         GenericType<Void> response = new GenericType<>(true,"Project deleted",null);
         return ResponseEntity.ok(response);
    }
}

