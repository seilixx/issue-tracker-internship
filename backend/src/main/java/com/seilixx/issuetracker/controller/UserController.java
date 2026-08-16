package com.seilixx.issuetracker.controller;


import com.seilixx.issuetracker.dto.GenericType;
import com.seilixx.issuetracker.dto.PagedResponse;
import com.seilixx.issuetracker.dto.UpdateRoleRequest;
import com.seilixx.issuetracker.dto.UserDto;
import com.seilixx.issuetracker.dto.UserProfileDto;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private  final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericType<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        GenericType<List<UserDto>> response = new GenericType<>(true , "list of users", users){};
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<GenericType<UserDto>> getUser(@PathVariable String uuid) {
        UserDto user = userService.getUserByUuid(uuid);
        GenericType<UserDto> response = new GenericType<>(true , "user", user){};
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{uuid}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericType<UserDto>> updateUserRole(
            @PathVariable String uuid,
            @Valid @RequestBody UpdateRoleRequest request) {
        UserDto updated = userService.updateUserRole(uuid, request.getRole());
        GenericType<UserDto> response = new GenericType<>(true, "Role updated", updated);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{uuid}/profile")
    public ResponseEntity<GenericType<UserProfileDto>> getUserProfile(
            @PathVariable String uuid,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        UserProfileDto profile = userService.getUserProfile(uuid, page, size);
        GenericType<UserProfileDto> response = new GenericType<>(true, "User profile", profile);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<GenericType<PagedResponse<UserDto>>> searchUsers(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<UserDto> results = userService.searchUsers(q, page, size);
        GenericType<PagedResponse<UserDto>> response = new GenericType<>(true, "Search results", results);
        return ResponseEntity.ok(response);
    }
}
