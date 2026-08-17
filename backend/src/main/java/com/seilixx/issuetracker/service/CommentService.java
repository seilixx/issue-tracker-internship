package com.seilixx.issuetracker.service;


import com.seilixx.issuetracker.dto.CommentCreateRequest;
import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.entity.Comment;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.CommentDeletedException;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.CommentRepository;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class CommentService {

    private static final String DELETED_PLACEHOLDER = "[comment deleted]";

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;


    public CommentService(CommentRepository commentRepository, IssueRepository issueRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public List<CommentDto> getAllComments(){
        List<Comment> comments =commentRepository.findAll();
        return comments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<CommentDto> getCommentsByIssueId(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        return issue.getComments().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CommentDto getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        return mapToDto(comment);
    }

    public CommentDto createComment(Long issueId, CommentCreateRequest dto) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        Comment comment = new Comment();
        comment.setTitle(dto.getTitle());
        comment.setContent(dto.getContent());
        comment.setIssue(issue);

        if (dto.getParentCommentId() != null) {
            Comment parent = commentRepository.findById(dto.getParentCommentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found"));
            if (parent.getIssue() == null || parent.getIssue().getId() != issue.getId()) {
                throw new IllegalArgumentException("Parent comment does not belong to this issue");
            }
            comment.setParentComment(parent);
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            comment.setAuthorUser((User) auth.getPrincipal());
        }

        Comment saved = commentRepository.save(comment);
        return mapToDto(saved);
    }

    public CommentDto updateComment(Long id, CommentDto dto) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        if (comment.isDeleted()) {
            throw new CommentDeletedException("Cannot edit a deleted comment");
        }
        comment.setTitle(dto.getTitle());
        comment.setContent(dto.getContent());
        return  mapToDto(commentRepository.save(comment));
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        // soft-delete: replies keep a stable parentCommentId to point to, and the API
        // renders a placeholder instead of cascading the delete to the thread.
        comment.setDeleted(true);
        comment.setTitle(null);
        comment.setContent(null);
        commentRepository.save(comment);
    }

    private CommentDto mapToDto(Comment comment){
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setIssueId(comment.getIssue().getId());
        commentDto.setCreatedAt(comment.getCreatedAt());
        commentDto.setDeleted(comment.isDeleted());
        if (comment.isDeleted()) {
            commentDto.setContent(DELETED_PLACEHOLDER);
        } else {
            commentDto.setTitle(comment.getTitle());
            commentDto.setContent(comment.getContent());
        }
        if(comment.getAuthorUser() != null){
            commentDto.setAuthorUuid(comment.getAuthorUser().getUuid());
            commentDto.setAuthorUserName(comment.getAuthorUser().getUsername());
        }
        if (comment.getParentComment() != null) {
            commentDto.setParentCommentId(comment.getParentComment().getId());
        }

        return commentDto;
    }
}
