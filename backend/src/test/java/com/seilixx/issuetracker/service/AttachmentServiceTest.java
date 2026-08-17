package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.repository.AttachmentRepository;
import com.seilixx.issuetracker.repository.IssueRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Path;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AttachmentServiceTest {

    @Mock
    private AttachmentRepository attachmentRepository;

    @Mock
    private IssueRepository issueRepository;

    @Test
    void uploadRejectsFileWhoseRealBytesDontMatchTheSpoofedContentType(@TempDir Path tempDir) {
        // Real FileStorageService (not mocked) so the magic-byte detection actually runs.
        FileStorageService fileStorageService = new FileStorageService(
                tempDir.toString(),
                "image/png,image/jpeg,image/gif,application/pdf,text/plain,application/zip");
        AttachmentService attachmentService = new AttachmentService(attachmentRepository, issueRepository, fileStorageService);

        Issue openIssue = new Issue();
        openIssue.setId(1L);
        openIssue.setStatus(Status.OPEN);
        when(issueRepository.findById(1L)).thenReturn(Optional.of(openIssue));

        // GZip magic bytes (1F 8B) - not on the allowlist - disguised as "photo.png" with a
        // lying image/png Content-Type, exactly like an attacker renaming a file would.
        byte[] gzipMagicBytes = { 0x1F, (byte) 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00 };
        MockMultipartFile spoofedFile = new MockMultipartFile("file", "photo.png", "image/png", gzipMagicBytes);

        assertThatThrownBy(() -> attachmentService.uploadAttachment(1L, spoofedFile))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Content type not allowed");

        verify(attachmentRepository, never()).save(any());
    }
}
