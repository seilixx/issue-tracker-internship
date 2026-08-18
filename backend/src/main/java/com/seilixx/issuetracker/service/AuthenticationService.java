package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.AuthenticationRequest;
import com.seilixx.issuetracker.dto.AuthenticationResponse;
import com.seilixx.issuetracker.dto.RefreshTokenRequest;
import com.seilixx.issuetracker.dto.RegisterRequest;
import com.seilixx.issuetracker.entity.RefreshToken;
import com.seilixx.issuetracker.entity.Role;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.repository.UserRepository;
import com.seilixx.issuetracker.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByMail(request.getMail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setMail(request.getMail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return issueTokens(user);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return issueTokens(user);
    }

    public AuthenticationResponse refresh(RefreshTokenRequest request) {
        RefreshToken consumed = refreshTokenService.verifyAndConsume(request.getRefreshToken());
        return issueTokens(consumed.getUser());
    }

    public void logout(RefreshTokenRequest request) {
        refreshTokenService.revoke(request.getRefreshToken());
    }

    private AuthenticationResponse issueTokens(User user) {
        String jwtToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.create(user);
        return new AuthenticationResponse(jwtToken, refreshToken.getToken(), user.getUsername(), user.getUuid());
    }
}
