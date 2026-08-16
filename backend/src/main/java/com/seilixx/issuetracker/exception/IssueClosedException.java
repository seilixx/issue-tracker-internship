package com.seilixx.issuetracker.exception;

public class IssueClosedException extends RuntimeException {
    public IssueClosedException(String message) {
        super(message);
    }
}
