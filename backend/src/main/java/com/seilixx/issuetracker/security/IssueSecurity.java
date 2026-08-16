package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("issueSecurity")
@RequiredArgsConstructor
public class IssueSecurity {

    private final IssueRepository issueRepository;

    public boolean isCreatorOrAssignee(Long issueId, Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User user)) {
            return false;
        }
        return issueRepository.findById(issueId)
                .map(issue -> isCreator(issue, user) || isAssignee(issue, user))
                .orElse(false);
    }

    // Broader than isCreatorOrAssignee: also grants the project leader, for actions the spec
    // scopes to "assigné/reporter/leader du projet" (editing issue fields, reassigning,
    // attaching files) as opposed to "reporter/assigné" only (commenting, status changes).
    public boolean isCreatorOrAssigneeOrProjectLeader(Long issueId, Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User user)) {
            return false;
        }
        return issueRepository.findById(issueId)
                .map(issue -> isCreator(issue, user) || isAssignee(issue, user) || isProjectLeader(issue, user))
                .orElse(false);
    }

    private boolean isCreator(Issue issue, User user) {
        return issue.getCreator() != null && issue.getCreator().getId() == user.getId();
    }

    private boolean isAssignee(Issue issue, User user) {
        return issue.getAssignees() != null
                && issue.getAssignees().stream().anyMatch(assignee -> assignee.getId() == user.getId());
    }

    private boolean isProjectLeader(Issue issue, User user) {
        return issue.getProject() != null && issue.getProject().getLeader() != null
                && issue.getProject().getLeader().getId() == user.getId();
    }
}
