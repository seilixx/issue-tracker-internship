package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.dto.IssueUpdateRequest;
import com.seilixx.issuetracker.dto.PagedResponse;
import com.seilixx.issuetracker.dto.UpdateStatusRequest;
import com.seilixx.issuetracker.entity.Priority;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
public class IssueController {
    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }



    @GetMapping
    public ResponseEntity<GenericType<PagedResponse<IssueDto>>> getIssues(
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String assigneeUuid,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PagedResponse<IssueDto> issues = issueService.getIssuesByFilters(
                projectId, status, priority, assigneeUuid, sortBy, sortDir, page, size);

        GenericType<PagedResponse<IssueDto>> response = new GenericType<>(true, "List of issues", issues);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<GenericType<IssueDto>> getIssue(@PathVariable long id) {
        IssueDto issue = issueService.getIssueById(id);
        GenericType<IssueDto> response = new GenericType<>(true, "Issue", issue);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<GenericType<IssueDto>> createIssue(@Valid @RequestBody IssueDto issueDto) {
        IssueDto issueCreated = issueService.createIssue(issueDto);

        GenericType<IssueDto> response = new GenericType<>(true, "here is the issue created", issueCreated);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee(#id, authentication)")
    public ResponseEntity<GenericType<IssueDto>> updateIssue(
            @PathVariable Long id,
            @Valid @RequestBody IssueUpdateRequest issueUpdateRequest) {
        IssueDto updated = issueService.updateIssue(id, issueUpdateRequest);
        GenericType<IssueDto> response = new GenericType<>(true, "Issue updated", updated);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee(#id, authentication)")
    public ResponseEntity<GenericType<IssueDto>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        IssueDto updated = issueService.updateStatus(id, request.getStatus());
        GenericType<IssueDto> response = new GenericType<>(true, "Status updated", updated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<GenericType<Void>> deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id);
        GenericType<Void> response = new GenericType<>(true, "Issue deleted", null);
        return ResponseEntity.ok(response);
    }
}
