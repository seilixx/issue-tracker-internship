package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.AttachmentDto;
import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.IssueUpdateRequest;
import com.seilixx.issuetracker.dto.PagedResponse;
import com.seilixx.issuetracker.dto.UserDto;
import com.seilixx.issuetracker.entity.*;
import com.seilixx.issuetracker.exception.IssueClosedException;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.AttachmentRepository;
import com.seilixx.issuetracker.repository.CommentRepository;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;




@Service
public class IssueService {

    private static final Set<String> SORTABLE_FIELDS = Set.of("status", "priority", "createdAt", "updatedAt");

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final CommentRepository commentRepository;
    private final AttachmentRepository attachmentRepository;

    public IssueService(IssueRepository issueRepository, ProjectRepository projectRepository,
            UserRepository userRepository, FileStorageService fileStorageService,
            CommentRepository commentRepository, AttachmentRepository attachmentRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
        this.commentRepository = commentRepository;
        this.attachmentRepository = attachmentRepository;
    }

    public List<IssueDto> getIssues() {
        List<Issue> issues = issueRepository.findAll();
        return  issues.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public IssueDto getIssueById(Long id) {
        Issue issue = issueRepository.findDetailById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        IssueDto dto = mapToDto(issue);

        List<CommentDto> commentDtos = commentRepository.findDetailByIssueId(id).stream()
                .map(comment -> mapCommentToDto(comment, id))
                .collect(Collectors.toList());
        dto.setComments(commentDtos);

        List<AttachmentDto> attachmentDtos = attachmentRepository.findDetailByIssueId(id).stream()
                .map(attachment -> mapAttachmentToDto(attachment, id))
                .collect(Collectors.toList());
        dto.setAttachments(attachmentDtos);

        return dto;
    }

    public List<IssueDto> getIssueByProjectId(Long projectId) {
        List<Issue> issues = issueRepository.findByProjectId(projectId);
        return  issues.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<IssueDto> getIssueByStatus(Status status) {
        List<Issue> issues = issueRepository.findByStatus(status);
        return issues.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<IssueDto> getIssueByPriority(Priority priority) {
        List<Issue> issues= issueRepository.findByPriority(priority);
        return issues.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PagedResponse<IssueDto> getIssuesByFilters(Long projectId, Status status, Priority priority,
            String assigneeUuid, String sortBy, String sortDir, int page, int size) {
        if (!SORTABLE_FIELDS.contains(sortBy)) {
            throw new IllegalArgumentException("sortBy must be one of " + SORTABLE_FIELDS);
        }
        Sort.Direction direction = Sort.Direction.fromString(sortDir);
        // secondary sort by id keeps ordering stable across pages when the primary
        // sort key has ties (e.g. many issues sharing the same status/priority)
        Sort sort = Sort.by(direction, sortBy).and(Sort.by(Sort.Direction.ASC, "id"));
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Issue> result = issueRepository.findByFilters(projectId, status, priority, assigneeUuid, pageable);
        List<IssueDto> content = result.getContent().stream().map(this::mapToDto).collect(Collectors.toList());
        return new PagedResponse<>(content, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages());
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

        if (issueDto.getAssignedUuids() != null && !issueDto.getAssignedUuids().isEmpty()) {
            List<User> assignees = issueDto.getAssignedUuids().stream().map(uuid -> userRepository.findByUuid(uuid)
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"))).collect(Collectors.toList());
            issue.setAssignees(assignees);
        }

        Issue savedIssue = issueRepository.save(issue);
        return mapToDto(savedIssue);
    }

    public IssueDto updateIssue(Long id, IssueUpdateRequest issueDto) {
        Issue issue=issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        if (issue.getStatus() == Status.DONE) {
            throw new IssueClosedException("Issue is closed and cannot be edited");
        }

        issue.setTitle(issueDto.getTitle());
        issue.setDescription(issueDto.getDescription());
        issue.setPriority(issueDto.getPriority());

        if (issueDto.getProjectId() != null) {
            Project project= projectRepository.findById(issueDto.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
            issue.setProject(project);
        }
        if (issueDto.getAssignedUuids() != null && !issueDto.getAssignedUuids().isEmpty()) {
            List<User> assignees = issueDto.getAssignedUuids().stream().map(uuid -> userRepository.findByUuid(uuid)
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"))).collect(Collectors.toList());
            issue.setAssignees(assignees);
        }
        Issue updatedissue=issueRepository.save(issue);
        return mapToDto(updatedissue);
    }

    public IssueDto updateStatus(Long id, Status newStatus) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        if (issue.getStatus() == Status.DONE) {
            throw new IssueClosedException("Issue is already closed and cannot change status");
        }

        issue.setStatus(newStatus);
        if (newStatus == Status.DONE) {
            issue.setClosedAt(LocalDateTime.now());
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof User user) {
                issue.setClosedBy(user);
            }
        }

        Issue updatedIssue = issueRepository.save(issue);
        return mapToDto(updatedIssue);
    }

    public void deleteIssue(Long id) {
        Issue issue=issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        if (issue.getAttachments() != null) {
            issue.getAttachments().forEach(attachment -> fileStorageService.delete(attachment.getStoragePath()));
        }
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
                    .map(comment -> mapCommentToDto(comment, issue.getId()))
                    .collect(Collectors.toList());
            dto.setComments(commentDtos);
        }

        return dto;
    }

    private CommentDto mapCommentToDto(Comment comment, long issueId) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setIssueId(issueId);
        commentDto.setCreatedAt(comment.getCreatedAt());
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
    }

    private AttachmentDto mapAttachmentToDto(Attachment attachment, long issueId) {
        AttachmentDto dto = new AttachmentDto();
        dto.setId(attachment.getId());
        dto.setIssueId(issueId);
        dto.setFileName(attachment.getFileName());
        dto.setContentType(attachment.getContentType());
        dto.setSizeBytes(attachment.getSizeBytes());
        dto.setUploadedAt(attachment.getUploadedAt());
        if (attachment.getUploadedBy() != null) {
            dto.setUploadedByUuid(attachment.getUploadedBy().getUuid());
        }
        return dto;
    }
}

