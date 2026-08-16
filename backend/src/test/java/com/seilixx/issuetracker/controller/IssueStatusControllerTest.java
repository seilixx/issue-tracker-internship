package com.seilixx.issuetracker.controller;

import com.seilixx.issuetracker.entity.Role;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.security.IssueSecurity;
import com.seilixx.issuetracker.security.JwtService;
import com.seilixx.issuetracker.service.IssueService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = IssueController.class)
@Import(IssueStatusControllerTest.MethodSecurityTestConfig.class)
class IssueStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IssueService issueService;

    @MockitoBean(name = "issueSecurity")
    private IssueSecurity issueSecurity;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void userNeitherCreatorNorAssigneeCannotChangeStatus() throws Exception {
        User outsider = new User();
        outsider.setId(99L);
        outsider.setRole(Role.USER);

        Authentication auth = new TestingAuthenticationToken(outsider, null, "ROLE_USER");
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(issueSecurity.isCreatorOrAssignee(anyLong(), any())).thenReturn(false);

        mockMvc.perform(patch("/api/issues/1/status")
                        .contentType("application/json")
                        .content("{\"status\":\"DONE\"}"))
                .andExpect(status().isForbidden());
    }

    @TestConfiguration
    @EnableMethodSecurity
    static class MethodSecurityTestConfig {
    }
}
