package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.entity.Role;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.security.CommentSecurity;
import com.seilixx.issuetracker.security.JwtService;
import com.seilixx.issuetracker.service.CommentService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CommentController.class)
@Import(CommentSecurityControllerTest.MethodSecurityTestConfig.class)
class CommentSecurityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CommentService commentService;

    @MockitoBean(name = "commentSecurity")
    private CommentSecurity commentSecurity;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void nonAuthorCannotUpdateComment() throws Exception {
        User outsider = new User();
        outsider.setId(99L);
        outsider.setRole(Role.USER);

        Authentication auth = new TestingAuthenticationToken(outsider, null, "ROLE_USER");
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(commentSecurity.isAuthor(anyLong(), any())).thenReturn(false);

        mockMvc.perform(put("/api/comments/1")
                        .contentType("application/json")
                        .content("{\"title\":\"t\",\"issueId\":1}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void nonAuthorCannotDeleteComment() throws Exception {
        User outsider = new User();
        outsider.setId(99L);
        outsider.setRole(Role.USER);

        Authentication auth = new TestingAuthenticationToken(outsider, null, "ROLE_USER");
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(commentSecurity.isAuthor(anyLong(), any())).thenReturn(false);

        mockMvc.perform(delete("/api/comments/1"))
                .andExpect(status().isForbidden());
    }

    @TestConfiguration
    @EnableMethodSecurity
    static class MethodSecurityTestConfig {
    }
}
