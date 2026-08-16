package com.seilixx.issuetracker.dto;

import lombok.Data;

@Data
public class UserProfileDto {
    private UserDto user;
    private long assignedIssuesCount;
    private long closedIssuesCount;
    private PagedResponse<IssueDto> assignedIssues;
    private PagedResponse<IssueDto> closedIssues;
}
