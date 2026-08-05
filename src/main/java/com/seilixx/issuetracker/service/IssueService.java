package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;




@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public IssueService(IssueRepository issueRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<IssueDto> getIssues() {
        List<Issue> issues = issueRepository.findAll();
        return  issues.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public IssueDto getIssueById(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        return mapToDto(issue);
    }

    public IssueDto createIssue(IssueDto issueDto) {
        Issue issue = new Issue();
        issue.setTitle(issueDto.getTitle());
        issue.setDescription(issueDto.getDescription());
        issue.setStatus(Status.OPEN);
        issue.setPriority(issueDto.getPriority());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            issue.setCreator((User) auth.getPrincipal());
        }

        if (issueDto.getProjectId() != null) {
            Project project = projectRepository.findById(issueDto.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
            issue.setProject(project);
        }

        if (issueDto.getAssignedIds() != null && !issueDto.getAssignedIds().isEmpty()) {
            List<User> assignees = userRepository.findAllById(issueDto.getAssignedIds());
            issue.setAssignees(assignees);
        }

        Issue savedIssue = issueRepository.save(issue);
        return mapToDto(savedIssue);
    }

    public IssueDto updateIssue(Long id,IssueDto issueDto) {
        Issue issue=issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        issue.setTitle(issueDto.getTitle());
        issue.setDescription(issueDto.getDescription());
        issue.setPriority(issueDto.getPriority());
        Status newStatus=issueDto.getStatus();
        Status oldStatus=issue.getStatus();
        issue.setStatus(newStatus);
        if (newStatus==Status.DONE && issue.getClosedAt()==null){
            issue.setClosedAt(LocalDateTime.now());
        } else if (oldStatus==Status.DONE && newStatus!= Status.DONE) {
            issue.setClosedAt(null);
        }

        if (issueDto.getProjectId() != null) {
            Project project= projectRepository.findById(issueDto.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
            issue.setProject(project);
        }
        if (issueDto.getAssignedIds() != null && !issueDto.getAssignedIds().isEmpty()) {
            List<User> assignees = userRepository.findAllById(issueDto.getAssignedIds());
            issue.setAssignees(assignees);
        }
        Issue updatedissue=issueRepository.save(issue);
        return mapToDto(updatedissue);
    }

    public void deleteIssue(Long id) {
        Issue issue=issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        issueRepository.delete(issue);
    }

    private IssueDto mapToDto(Issue issue) {
        IssueDto dto = new IssueDto();
        dto.setId(issue.getId());
        dto.setTitle(issue.getTitle());
        dto.setDescription(issue.getDescription());
        dto.setStatus(issue.getStatus());
        dto.setPriority(issue.getPriority());
        dto.setCreatedAt(issue.getCreatedAt());
        dto.setUpdatedAt(issue.getUpdatedAt());
        dto.setClosedAt(issue.getClosedAt());

        if (issue.getProject() != null) {
            dto.setProjectId(issue.getProject().getId());
        }

        if (issue.getCreator() != null) {
            dto.setCreatorId(issue.getCreator().getId());
        }

        if (issue.getAssignees() != null) {
            List<Long> assigneeIds = issue.getAssignees().stream()
                    .map(User::getId)
                    .collect(Collectors.toList());
            dto.setAssignedIds(assigneeIds);
        }

        return dto;
    }
}
