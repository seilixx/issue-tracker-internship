package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {
    private final IssueService issueService;
    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<GenericType<List<IssueDto>>> getIssues() {
        List<IssueDto> issues = issueService.getIssues();
        GenericType<List<IssueDto>> response = new GenericType<>(true,"here is the issues list", issues);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public IssueDto getIssue(@PathVariable long id) {
        return issueService.getIssueById(id);
    }

    @PostMapping
    public ResponseEntity<GenericType<IssueDto>> createIssue(@RequestBody IssueDto issueDto) {
        IssueDto issueCreated = issueService.createIssue(issueDto);

        GenericType<IssueDto> response = new GenericType<>(true,"here is the issue created", issueCreated);
        return ResponseEntity.status(201).body(response);
    }

}
