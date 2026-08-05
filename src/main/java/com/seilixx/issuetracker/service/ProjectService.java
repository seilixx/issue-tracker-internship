package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {

        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getProjects() {
         List<Project> projects= projectRepository.findAll();
         return projects.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ProjectDto getProjectById(Long id){
        Project project = projectRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Project not found"));

        return mapToDto(project);
    }

    public ProjectDto createProject(ProjectDto dto){
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        Project createdProject= projectRepository.save(project);
        return mapToDto(createdProject);
    }

    public ProjectDto updateProject(Long id, ProjectDto dto){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        return  mapToDto(projectRepository.save(project));
    }

    public void deleteProject(Long id){
        Project project= projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        projectRepository.delete(project);
    }

    private ProjectDto mapToDto(Project project){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setDescription(project.getDescription());
        return projectDto;
    }
}
