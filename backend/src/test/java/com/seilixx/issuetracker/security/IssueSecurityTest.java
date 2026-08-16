package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.IssueRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IssueSecurityTest {

    @Mock
    private IssueRepository issueRepository;

    @InjectMocks
    private IssueSecurity issueSecurity;

    @Mock
    private Authentication authentication;

    @Test
    void userNeitherCreatorNorAssigneeCannotActOnIssue() {
        User reporter = new User();
        reporter.setId(1L);
        User assignee = new User();
        assignee.setId(2L);
        User outsider = new User();
        outsider.setId(3L);

        Issue issue = new Issue();
        issue.setCreator(reporter);
        issue.setAssignees(List.of(assignee));

        when(issueRepository.findById(10L)).thenReturn(Optional.of(issue));
        when(authentication.getPrincipal()).thenReturn(outsider);

        assertThat(issueSecurity.isCreatorOrAssignee(10L, authentication)).isFalse();
    }

    @Test
    void assigneeCanActOnIssue() {
        User assignee = new User();
        assignee.setId(2L);

        Issue issue = new Issue();
        issue.setAssignees(List.of(assignee));

        when(issueRepository.findById(10L)).thenReturn(Optional.of(issue));
        when(authentication.getPrincipal()).thenReturn(assignee);

        assertThat(issueSecurity.isCreatorOrAssignee(10L, authentication)).isTrue();
    }

    @Test
    void creatorCanActOnIssue() {
        User creator = new User();
        creator.setId(1L);

        Issue issue = new Issue();
        issue.setCreator(creator);

        when(issueRepository.findById(10L)).thenReturn(Optional.of(issue));
        when(authentication.getPrincipal()).thenReturn(creator);

        assertThat(issueSecurity.isCreatorOrAssignee(10L, authentication)).isTrue();
    }

    @Test
    void projectLeaderCanActOnIssueViaBroaderCheckOnly() {
        User leader = new User();
        leader.setId(4L);

        Project project = new Project();
        project.setLeader(leader);

        Issue issue = new Issue();
        issue.setProject(project);

        when(issueRepository.findById(10L)).thenReturn(Optional.of(issue));
        when(authentication.getPrincipal()).thenReturn(leader);

        assertThat(issueSecurity.isCreatorOrAssigneeOrProjectLeader(10L, authentication)).isTrue();
        assertThat(issueSecurity.isCreatorOrAssignee(10L, authentication)).isFalse();
    }

    @Test
    void outsiderCannotActOnIssueViaBroaderCheck() {
        User leader = new User();
        leader.setId(4L);
        User outsider = new User();
        outsider.setId(5L);

        Project project = new Project();
        project.setLeader(leader);

        Issue issue = new Issue();
        issue.setProject(project);

        when(issueRepository.findById(10L)).thenReturn(Optional.of(issue));
        when(authentication.getPrincipal()).thenReturn(outsider);

        assertThat(issueSecurity.isCreatorOrAssigneeOrProjectLeader(10L, authentication)).isFalse();
    }
}
