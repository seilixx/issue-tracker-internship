package com.seilixx.issuetracker.security;

import com.seilixx.issuetracker.controller.IssueController;
import com.seilixx.issuetracker.service.IssueService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.security.Key;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Unlike IssueStatusControllerTest/CommentSecurityControllerTest, which mock JwtService and
// inject an Authentication directly to test @PreAuthorize in isolation, this test needs the
// *real* JwtAuthenticationFilter and SecurityConfig wired in — the whole point is verifying
// what the filter itself does when JJWT throws while parsing the token.
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = IssueController.class)
@Import({ SecurityConfig.class, JwtAuthenticationFilter.class, JwtService.class })
class JwtAuthenticationFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @MockitoBean
    private IssueService issueService;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void expiredTokenReturns401NotServerError() throws Exception {
        String expiredToken = tokenExpiringAt(new Date(System.currentTimeMillis() - 5_000));

        mockMvc.perform(get("/api/issues/1").header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Token has expired."));
    }

    @Test
    void malformedTokenReturns401NotServerError() throws Exception {
        mockMvc.perform(get("/api/issues/1").header("Authorization", "Bearer not-a-real-jwt-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }

    private String tokenExpiringAt(Date expiration) {
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        return Jwts.builder()
                .setSubject("someone")
                .setIssuedAt(new Date(System.currentTimeMillis() - 20_000))
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
