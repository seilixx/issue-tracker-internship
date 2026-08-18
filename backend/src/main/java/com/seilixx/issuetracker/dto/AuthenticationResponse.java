package com.seilixx.issuetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String refreshToken;
    private String username;
    private String uuid;
}