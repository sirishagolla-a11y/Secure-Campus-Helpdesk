package com.campus.helpdesk.service;

import com.campus.helpdesk.dto.AuthResponse;
import com.campus.helpdesk.dto.RegisterRequest;
import com.campus.helpdesk.entity.Role;
import com.campus.helpdesk.entity.User;
import com.campus.helpdesk.repository.UserRepository;
import com.campus.helpdesk.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("Test Student", "student@campus.edu", "password123");
    }

    @Test
    void registerStudent_Success() {
        when(userRepository.existsByEmail("student@campus.edu")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");

        User savedUser = new User(1L, "Test Student", "student@campus.edu", "hashedPassword", Role.STUDENT);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(tokenProvider.generateToken(auth)).thenReturn("mock-jwt-token");

        AuthResponse response = authService.registerStudent(registerRequest);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertEquals("Test Student", response.getUser().getName());
        assertEquals(Role.STUDENT, response.getUser().getRole());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void registerStudent_DuplicateEmail_ThrowsException() {
        when(userRepository.existsByEmail("student@campus.edu")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> authService.registerStudent(registerRequest));
        verify(userRepository, never()).save(any(User.class));
    }
}
