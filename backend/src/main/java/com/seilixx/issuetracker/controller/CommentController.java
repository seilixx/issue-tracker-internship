package com.seilixx.issuetracker.controller;


import com.seilixx.issuetracker.dto.CommentCreateRequest;
import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    private final CommentService commentService;


    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/api/issues/{id}/comments")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee(#id, authentication)")
    public ResponseEntity<GenericType<CommentDto>> createComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentCreateRequest request) {
        CommentDto commentCreated = commentService.createComment(id, request);
        GenericType<CommentDto> response = new GenericType<>(true, "Comment created", commentCreated);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/api/comments")
    public ResponseEntity<GenericType<List<CommentDto>>> getAllComments() {
        List<CommentDto> comments = commentService.getAllComments();
        return ResponseEntity.ok(new GenericType<>(true, "All comments", comments));
    }


    @GetMapping("/api/comments/issue/{issueId}")
    public ResponseEntity<GenericType<List<CommentDto>>> getCommentsByIssue(@PathVariable Long issueId) {
        List<CommentDto> comments = commentService.getCommentsByIssueId(issueId);
        GenericType<List<CommentDto>> response =new GenericType<>(true, "Comments for issue " + issueId, comments);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/comments/{id}")
    public ResponseEntity<GenericType<CommentDto>> getCommentsByCommentId(@PathVariable Long id) {
        CommentDto comment = commentService.getCommentById(id);
        GenericType<CommentDto> response =new GenericType<>(true, "Comments" , comment);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/comments/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @commentSecurity.isAuthor(#id, authentication)")
    public ResponseEntity<GenericType<CommentDto>> updateComment(@PathVariable Long id, @Valid @RequestBody CommentDto dto) {
        CommentDto commentUpdated = commentService.updateComment(id, dto);
        GenericType<CommentDto> response =new GenericType<>(true, "Comment updated", commentUpdated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/comments/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @commentSecurity.isAuthor(#id, authentication)")
    public ResponseEntity<GenericType<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        GenericType<Void> response =new GenericType<>(true, "Comment deleted", null);
        return ResponseEntity.ok(response);
    }
}
