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

    private boolean isCreator(Issue issue, User user) {
        return issue.getCreator() != null && issue.getCreator().getId() == user.getId();
    }

    private boolean isAssignee(Issue issue, User user) {
        return issue.getAssignees() != null
                && issue.getAssignees().stream().anyMatch(assignee -> assignee.getId() == user.getId());
    }
}
