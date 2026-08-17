package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.PagedResponse;
import com.seilixx.issuetracker.dto.UpdateProfileRequest;
import com.seilixx.issuetracker.dto.UserDto;
import com.seilixx.issuetracker.dto.UserProfileDto;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Role;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final long MAX_AVATAR_SIZE_BYTES = 3L * 1024 * 1024;
    private static final Set<String> ALLOWED_AVATAR_CONTENT_TYPES = Set.of("image/png", "image/jpeg", "image/gif", "image/webp");

    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final FileStorageService fileStorageService;

    public UserService(UserRepository userRepository, IssueRepository issueRepository,
            ProjectRepository projectRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.fileStorageService = fileStorageService;
    }

    private User currentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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

    public UserDto getMyProfile() {
        return mapToDto(currentUser());
    }

    public UserDto updateMyProfile(UpdateProfileRequest request) {
        User user = userRepository.findByUuid(currentUser().getUuid())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setBio(request.getBio());
        userRepository.save(user);
        return mapToDto(user);
    }

    public UserDto updateMyAvatar(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (file.getSize() > MAX_AVATAR_SIZE_BYTES) {
            throw new IllegalArgumentException("Avatar exceeds the maximum allowed size (3MB)");
        }
        String detectedContentType = fileStorageService.detectContentType(file);
        if (!ALLOWED_AVATAR_CONTENT_TYPES.contains(detectedContentType)) {
            throw new IllegalArgumentException("Avatars must be an image (png, jpeg, gif, or webp)");
        }

        User user = userRepository.findByUuid(currentUser().getUuid())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String previousStoragePath = user.getAvatarStoragePath();
        String storagePath = fileStorageService.store(file);
        user.setAvatarStoragePath(storagePath);
        user.setAvatarContentType(detectedContentType);
        userRepository.save(user);

        if (previousStoragePath != null) {
            fileStorageService.delete(previousStoragePath);
        }

        return mapToDto(user);
    }

    public AvatarContent downloadAvatar(String uuid) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getAvatarStoragePath() == null) {
            throw new ResourceNotFoundException("This user has no avatar");
        }
        Resource resource = fileStorageService.load(user.getAvatarStoragePath());
        return new AvatarContent(resource, user.getAvatarContentType());
    }

    public record AvatarContent(Resource resource, String contentType) {
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
        userDto.setBio(user.getBio());
        if (user.getAvatarStoragePath() != null) {
            userDto.setAvatarUrl("/api/users/" + user.getUuid() + "/avatar");
        }
        return userDto;
    }
}
