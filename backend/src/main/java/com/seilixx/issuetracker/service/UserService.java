package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.PagedResponse;
import com.seilixx.issuetracker.dto.UserDto;
import com.seilixx.issuetracker.dto.UserProfileDto;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Role;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;

    public UserService(UserRepository userRepository, IssueRepository issueRepository,
            ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UserDto getUserByUuid(String uuid) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToDto(user);
    }

    public UserDto updateUserRole(String uuid, Role newRole) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getUuid().equals(uuid)) {
            throw new AccessDeniedException("You cannot change your own role");
        }

        User target = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        target.setRole(newRole);
        userRepository.save(target);
        return mapToDto(target);
    }

    public UserProfileDto getUserProfile(String uuid, int page, int size) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Issue> assignedPage = issueRepository.findByAssignees_Uuid(uuid, pageable);
        Page<Issue> closedPage = issueRepository.findByClosedBy_Uuid(uuid, pageable);

        UserProfileDto profile = new UserProfileDto();
        profile.setUser(mapToDto(user));
        profile.setAssignedIssuesCount(assignedPage.getTotalElements());
        profile.setClosedIssuesCount(closedPage.getTotalElements());
        profile.setAssignedIssues(toPagedResponse(assignedPage));
        profile.setClosedIssues(toPagedResponse(closedPage));
        return profile;
    }

    public PagedResponse<UserDto> searchUsers(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> results = userRepository.search(query, pageable);
        List<UserDto> content = results.getContent().stream().map(this::mapToDto).collect(Collectors.toList());
        return new PagedResponse<>(content, results.getNumber(), results.getSize(),
                results.getTotalElements(), results.getTotalPages());
    }

    private PagedResponse<IssueDto> toPagedResponse(Page<Issue> page) {
        List<IssueDto> content = page.getContent().stream().map(this::mapToIssueDto).collect(Collectors.toList());
        return new PagedResponse<>(content, page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }

    private IssueDto mapToIssueDto(Issue issue) {
        IssueDto dto = new IssueDto();
        dto.setId(issue.getId());
        dto.setTitle(issue.getTitle());
        dto.setDescription(issue.getDescription());
        dto.setStatus(issue.getStatus());
        dto.setPriority(issue.getPriority());
        dto.setCreatedAt(issue.getCreatedAt());
        dto.setUpdatedAt(issue.getUpdatedAt());
        dto.setClosedAt(issue.getClosedAt());
        if (issue.getClosedBy() != null) {
            dto.setClosedByUuid(issue.getClosedBy().getUuid());
        }
        if (issue.getProject() != null) {
            dto.setProjectId(issue.getProject().getId());
        }
        if (issue.getCreator() != null) {
            dto.setCreatorUuid(issue.getCreator().getUuid());
        }
        if (issue.getAssignees() != null) {
            dto.setAssignedUuids(issue.getAssignees().stream()
                    .map(User::getUuid)
                    .collect(Collectors.toList()));
        }
        if (issue.getComments() != null) {
            List<CommentDto> commentDtos = issue.getComments().stream()
                    .map(comment -> {
                        CommentDto commentDto = new CommentDto();
                        commentDto.setId(comment.getId());
                        commentDto.setIssueId(issue.getId());
                        commentDto.setDeleted(comment.isDeleted());
                        if (comment.isDeleted()) {
                            commentDto.setContent("[comment deleted]");
                        } else {
                            commentDto.setTitle(comment.getTitle());
                            commentDto.setContent(comment.getContent());
                        }
                        if (comment.getAuthorUser() != null) {
                            commentDto.setAuthorUuid(comment.getAuthorUser().getUuid());
                            commentDto.setAuthorUserName(comment.getAuthorUser().getUsername());
                        }
                        if (comment.getParentComment() != null) {
                            commentDto.setParentCommentId(comment.getParentComment().getId());
                        }
                        return commentDto;
                    }).collect(Collectors.toList());
            dto.setComments(commentDtos);
        }
        return dto;
    }

    private UserDto mapToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUuid(user.getUuid());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUsername(user.getUsername());
        userDto.setRole(user.getRole());
        return userDto;
    }
}
