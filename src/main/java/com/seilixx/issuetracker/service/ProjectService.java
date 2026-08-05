package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    private ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getProjects() {
         List<Project> projects= projectRepository.findAll();
         List<ProjectDto> projectDtos = new ArrayList<>();
         for (Project project : projects) {
             ProjectDto projectDto = new ProjectDto();
             projectDto.setId(project.getId());
             projectDto.setTitle(project.getTitle());
             projectDto.setDescription(project.getDescription());

             projectDtos.add(projectDto);
         }
         return projectDtos;
    }

    public ProjectDto getProjectById(Long id){
        Project project = projectRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Project not found"));
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setDescription(project.getDescription());
        return projectDto;
    }


}
