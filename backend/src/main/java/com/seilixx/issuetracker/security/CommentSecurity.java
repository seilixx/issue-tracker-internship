package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("commentSecurity")
@RequiredArgsConstructor
public class CommentSecurity {

    private final CommentRepository commentRepository;

    public boolean isAuthor(Long commentId, Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User user)) {
            return false;
        }
        return commentRepository.findById(commentId)
                .map(comment -> comment.getAuthorUser() != null && comment.getAuthorUser().getId() == user.getId())
                .orElse(false);
    }
}
