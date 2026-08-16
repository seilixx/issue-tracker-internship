package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.AuthenticationRequest;
import com.seilixx.issuetracker.dto.AuthenticationResponse;
import com.seilixx.issuetracker.dto.RegisterRequest;
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

        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken, user.getUsername(), user.getUuid());
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

        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken, user.getUsername(), user.getUuid());
    }
}
