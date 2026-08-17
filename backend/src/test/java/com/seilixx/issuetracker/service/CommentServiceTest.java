package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.CommentDto;
import com.seilixx.issuetracker.entity.Comment;
import com.seilixx.issuetracker.exception.CommentDeletedException;
import com.seilixx.issuetracker.repository.CommentRepository;
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
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentService commentService;

    @Test
    void updateOnDeletedCommentIsRejected() {
        Comment deletedComment = new Comment();
        deletedComment.setId(5L);
        deletedComment.setDeleted(true);

        when(commentRepository.findById(5L)).thenReturn(Optional.of(deletedComment));

        CommentDto update = new CommentDto();
        update.setTitle("resurrected");
        update.setContent("should not be saved");

        assertThatThrownBy(() -> commentService.updateComment(5L, update))
                .isInstanceOf(CommentDeletedException.class);

        verify(commentRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }
}
