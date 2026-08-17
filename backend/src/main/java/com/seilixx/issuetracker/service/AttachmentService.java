package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.AttachmentDto;
import com.seilixx.issuetracker.entity.Attachment;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.IssueClosedException;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.AttachmentRepository;
import com.seilixx.issuetracker.repository.IssueRepository;
import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final IssueRepository issueRepository;
    private final FileStorageService fileStorageService;

    public AttachmentService(AttachmentRepository attachmentRepository, IssueRepository issueRepository,
            FileStorageService fileStorageService) {
        this.attachmentRepository = attachmentRepository;
        this.issueRepository = issueRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<AttachmentDto> getAttachmentsByIssueId(Long issueId) {
        return attachmentRepository.findByIssueId(issueId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public AttachmentDto uploadAttachment(Long issueId, MultipartFile file) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        if (issue.getStatus() == Status.DONE) {
            throw new IssueClosedException("Issue is closed and cannot receive new attachments");
        }
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String detectedContentType = fileStorageService.detectContentType(file);
        if (!fileStorageService.isContentTypeAllowed(detectedContentType)) {
            throw new IllegalArgumentException("Content type not allowed: " + detectedContentType);
        }

        String storagePath = fileStorageService.store(file);

        Attachment attachment = new Attachment();
        attachment.setIssue(issue);
        attachment.setFileName(file.getOriginalFilename());
        attachment.setStoragePath(storagePath);
        attachment.setContentType(detectedContentType);
        attachment.setSizeBytes(file.getSize());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User user) {
            attachment.setUploadedBy(user);
        }

        Attachment saved = attachmentRepository.save(attachment);
        return mapToDto(saved);
    }

    public void deleteAttachment(Long id) {
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));
        fileStorageService.delete(attachment.getStoragePath());
        attachmentRepository.delete(attachment);
    }

    public AttachmentContent downloadAttachment(Long id) {
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found"));
        Resource resource = fileStorageService.load(attachment.getStoragePath());
        return new AttachmentContent(resource, attachment.getFileName(), attachment.getContentType());
    }

    public record AttachmentContent(Resource resource, String fileName, String contentType) {
    }

    private AttachmentDto mapToDto(Attachment attachment) {
        AttachmentDto dto = new AttachmentDto();
        dto.setId(attachment.getId());
        dto.setFileName(attachment.getFileName());
        dto.setContentType(attachment.getContentType());
        dto.setSizeBytes(attachment.getSizeBytes());
        dto.setUploadedAt(attachment.getUploadedAt());
        if (attachment.getIssue() != null) {
            dto.setIssueId(attachment.getIssue().getId());
        }
        if (attachment.getUploadedBy() != null) {
            dto.setUploadedByUuid(attachment.getUploadedBy().getUuid());
        }
        return dto;
    }
}
