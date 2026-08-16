package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.entity.Comment;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.CommentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CommentSecurityTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentSecurity commentSecurity;

    @Mock
    private Authentication authentication;

    @Test
    void authorCanActOnOwnComment() {
        User author = new User();
        author.setId(1L);

        Comment comment = new Comment();
        comment.setAuthorUser(author);

        when(commentRepository.findById(10L)).thenReturn(Optional.of(comment));
        when(authentication.getPrincipal()).thenReturn(author);

        assertThat(commentSecurity.isAuthor(10L, authentication)).isTrue();
    }

    @Test
    void nonAuthorCannotActOnComment() {
        User author = new User();
        author.setId(1L);
        User outsider = new User();
        outsider.setId(2L);

        Comment comment = new Comment();
        comment.setAuthorUser(author);

        when(commentRepository.findById(10L)).thenReturn(Optional.of(comment));
        when(authentication.getPrincipal()).thenReturn(outsider);

        assertThat(commentSecurity.isAuthor(10L, authentication)).isFalse();
    }
}
