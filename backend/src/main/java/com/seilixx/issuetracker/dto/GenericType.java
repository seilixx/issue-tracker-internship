package com.seilixx.issuetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
    public class GenericType<T> {
    private boolean success;
    private String message;
    private T data;
}
