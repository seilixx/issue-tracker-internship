package com.seilixx.issuetracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FileStorageService {

    private final Path storageDir;
    private final Set<String> allowedContentTypes;

    public FileStorageService(
            @Value("${app.attachments.storage-dir}") String storageDir,
            @Value("${app.attachments.allowed-content-types}") String allowedContentTypes) {
        this.storageDir = Paths.get(storageDir).toAbsolutePath().normalize();
        this.allowedContentTypes = Arrays.stream(allowedContentTypes.split(","))
                .map(String::trim)
                .collect(Collectors.toSet());
        try {
            Files.createDirectories(this.storageDir);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not create attachment storage directory", e);
        }
    }

    public boolean isContentTypeAllowed(String contentType) {
        return contentType != null && allowedContentTypes.contains(contentType);
    }

    /**
     * Stores the file under a generated name (never the client-supplied filename) so the
     * storage path can't be manipulated into escaping the storage directory.
     */
    public String store(MultipartFile file) {
        String storedName = UUID.randomUUID() + extensionOf(file.getOriginalFilename());
        Path target = storageDir.resolve(storedName);
        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to store attachment", e);
        }
        return target.toString();
    }

    public Resource load(String storagePath) {
        Path path = Paths.get(storagePath);
        Resource resource = new PathResource(path);
        if (!resource.exists() || !resource.isReadable()) {
            throw new UncheckedIOException(new IOException("Attachment file not found on disk"));
        }
        return resource;
    }

    public void delete(String storagePath) {
        try {
            Files.deleteIfExists(Paths.get(storagePath));
        } catch (IOException e) {
            // best-effort cleanup: the DB row is the source of truth, a leftover file on disk
            // isn't worth failing the request over.
        }
    }

    private String extensionOf(String originalFilename) {
        if (originalFilename == null) {
            return "";
        }
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex < 0) {
            return "";
        }
        String extension = originalFilename.substring(dotIndex);
        // only keep it if it's a plain ".ext" with no path separators / traversal sequences
        return extension.matches("\\.[A-Za-z0-9]{1,10}") ? extension : "";
    }
}
