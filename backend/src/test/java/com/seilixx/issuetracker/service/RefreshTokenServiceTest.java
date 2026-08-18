package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.entity.RefreshToken;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.InvalidRefreshTokenException;
import com.seilixx.issuetracker.repository.RefreshTokenRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RefreshTokenServiceTest {

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    private RefreshTokenService refreshTokenService;

    private RefreshTokenService service() {
        RefreshTokenService instance = new RefreshTokenService(refreshTokenRepository);
        ReflectionTestUtils.setField(instance, "refreshExpirationMs", 604_800_000L);
        return instance;
    }

    @Test
    void verifyAndConsumeAcceptsAValidTokenAndRevokesIt() {
        refreshTokenService = service();
        User user = new User();
        user.setId(1L);

        RefreshToken token = new RefreshToken();
        token.setToken("valid-token");
        token.setUser(user);
        token.setRevoked(false);
        token.setExpiryDate(LocalDateTime.now().plusDays(1));

        when(refreshTokenRepository.findByToken("valid-token")).thenReturn(Optional.of(token));

        RefreshToken result = refreshTokenService.verifyAndConsume("valid-token");

        assertThat(result.getUser()).isSameAs(user);
        ArgumentCaptor<RefreshToken> saved = ArgumentCaptor.forClass(RefreshToken.class);
        verify(refreshTokenRepository).save(saved.capture());
        assertThat(saved.getValue().isRevoked()).isTrue();
    }

    @Test
    void verifyAndConsumeRejectsAnAlreadyRevokedToken() {
        refreshTokenService = service();
        RefreshToken token = new RefreshToken();
        token.setToken("used-token");
        token.setRevoked(true);
        token.setExpiryDate(LocalDateTime.now().plusDays(1));

        when(refreshTokenRepository.findByToken("used-token")).thenReturn(Optional.of(token));

        assertThatThrownBy(() -> refreshTokenService.verifyAndConsume("used-token"))
                .isInstanceOf(InvalidRefreshTokenException.class);
        verify(refreshTokenRepository, never()).save(any());
    }

    @Test
    void verifyAndConsumeRejectsAnExpiredToken() {
        refreshTokenService = service();
        RefreshToken token = new RefreshToken();
        token.setToken("expired-token");
        token.setRevoked(false);
        token.setExpiryDate(LocalDateTime.now().minusMinutes(1));

        when(refreshTokenRepository.findByToken("expired-token")).thenReturn(Optional.of(token));

        assertThatThrownBy(() -> refreshTokenService.verifyAndConsume("expired-token"))
                .isInstanceOf(InvalidRefreshTokenException.class);
        verify(refreshTokenRepository, never()).save(any());
    }

    @Test
    void verifyAndConsumeRejectsAnUnknownToken() {
        refreshTokenService = service();
        when(refreshTokenRepository.findByToken("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> refreshTokenService.verifyAndConsume("unknown"))
                .isInstanceOf(InvalidRefreshTokenException.class);
    }
}
