package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.AttachmentDto;
import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.service.AttachmentService;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @PostMapping("/api/issues/{id}/attachments")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee(#id, authentication)")
    public ResponseEntity<GenericType<AttachmentDto>> uploadAttachment(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        AttachmentDto uploaded = attachmentService.uploadAttachment(id, file);
        GenericType<AttachmentDto> response = new GenericType<>(true, "Attachment uploaded", uploaded);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/api/issues/{id}/attachments")
    public ResponseEntity<GenericType<List<AttachmentDto>>> getAttachments(@PathVariable Long id) {
        List<AttachmentDto> attachments = attachmentService.getAttachmentsByIssueId(id);
        GenericType<List<AttachmentDto>> response = new GenericType<>(true, "Attachments", attachments);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/attachments/{id}/content")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long id) {
        AttachmentService.AttachmentContent content = attachmentService.downloadAttachment(id);
        ContentDisposition disposition = ContentDisposition.attachment()
                .filename(content.fileName() != null ? content.fileName() : "attachment")
                .build();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(content.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .body(content.resource());
    }

    @DeleteMapping("/api/attachments/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @attachmentSecurity.isUploader(#id, authentication)")
    public ResponseEntity<GenericType<Void>> deleteAttachment(@PathVariable Long id) {
        attachmentService.deleteAttachment(id);
        GenericType<Void> response = new GenericType<>(true, "Attachment deleted", null);
        return ResponseEntity.ok(response);
    }
}
