package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.dto.AuthenticationRequest;
import com.seilixx.issuetracker.dto.AuthenticationResponse;
import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.RefreshTokenRequest;
import com.seilixx.issuetracker.dto.RegisterRequest;
import com.seilixx.issuetracker.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<GenericType<AuthenticationResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthenticationResponse response = authService.register(request);
        return ResponseEntity.ok(new GenericType<>(true, "User registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<GenericType<AuthenticationResponse>> login(
            @Valid @RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authService.login(request);
        return ResponseEntity.ok(new GenericType<>(true, "Login successful", response));
    }

    // No @PreAuthorize needed: this and /logout are already under /api/auth/** (permitAll
    // in SecurityConfig) — by design, since the whole point is working with an *expired*
    // access token. Both operate purely on the refresh token in the request body.
    @PostMapping("/refresh")
    public ResponseEntity<GenericType<AuthenticationResponse>> refresh(
            @Valid @RequestBody RefreshTokenRequest request) {
        AuthenticationResponse response = authService.refresh(request);
        return ResponseEntity.ok(new GenericType<>(true, "Token refreshed", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericType<Void>> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authService.logout(request);
        return ResponseEntity.ok(new GenericType<>(true, "Logged out", null));
    }
}