package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.ProjectDto;
import com.seilixx.issuetracker.dto.ProjectUpdateRequest;
import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.entity.ProjectCategory;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectDto> getProjects(ProjectCategory category) {
        List<Project> projects = category != null
                ? projectRepository.findByCategory(category)
                : projectRepository.findAll();
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
        project.setCategory(dto.getCategory());
        project.setLeader(resolveLeader(dto.getLeaderUuid()));
        Project createdProject= projectRepository.save(project);
        return mapToDto(createdProject);
    }

    public ProjectDto updateProject(Long id, ProjectUpdateRequest dto){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setLeader(resolveLeader(dto.getLeaderUuid()));
        return  mapToDto(projectRepository.save(project));
    }

    public ProjectDto updateCategory(Long id, ProjectCategory category) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setCategory(category);
        return mapToDto(projectRepository.save(project));
    }

    public void deleteProject(Long id){
        Project project= projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        projectRepository.delete(project);
    }

    private User resolveLeader(String leaderUuid) {
        return userRepository.findByUuid(leaderUuid)
                .orElseThrow(() -> new ResourceNotFoundException("Leader not found"));
    }

    private ProjectDto mapToDto(Project project){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setDescription(project.getDescription());
        projectDto.setCategory(project.getCategory());
        if (project.getLeader() != null) {
            projectDto.setLeaderUuid(project.getLeader().getUuid());
        }
        return projectDto;
    }
}
