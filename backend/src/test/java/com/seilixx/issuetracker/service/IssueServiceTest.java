package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.exception.IssueClosedException;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IssueServiceTest {

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private IssueService issueService;

    @Test
    void updateStatusOnAlreadyClosedIssueIsRejected() {
        Issue closedIssue = new Issue();
        closedIssue.setId(10L);
        closedIssue.setStatus(Status.DONE);

        when(issueRepository.findById(10L)).thenReturn(Optional.of(closedIssue));

        assertThatThrownBy(() -> issueService.updateStatus(10L, Status.IN_PROGRESS))
                .isInstanceOf(IssueClosedException.class);
    }
}
