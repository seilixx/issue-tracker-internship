package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("attachmentSecurity")
@RequiredArgsConstructor
public class AttachmentSecurity {

    private final AttachmentRepository attachmentRepository;

    public boolean isUploader(Long attachmentId, Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User user)) {
            return false;
        }
        return attachmentRepository.findById(attachmentId)
                .map(attachment -> attachment.getUploadedBy() != null && attachment.getUploadedBy().getId() == user.getId())
                .orElse(false);
    }
}
