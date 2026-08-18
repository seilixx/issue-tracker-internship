package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotBlank(message = "refreshToken necessary")
    private String refreshToken;
}
