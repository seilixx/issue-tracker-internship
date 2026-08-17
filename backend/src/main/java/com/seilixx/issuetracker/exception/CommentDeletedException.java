package com.seilixx.issuetracker.exception;

public class CommentDeletedException extends RuntimeException {
    public CommentDeletedException(String message) {
        super(message);
    }
}
