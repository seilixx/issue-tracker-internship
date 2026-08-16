package com.seilixx.issuetracker.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AttachmentDto {
    private Long id;
    private Long issueId;
    private String fileName;
    private String contentType;
    private long sizeBytes;
    private String uploadedByUuid;
    private LocalDateTime uploadedAt;
}
