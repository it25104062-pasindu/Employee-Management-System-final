package com.ems.controller;

import com.ems.entity.User;
import com.ems.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder) {

        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        if (request.getUsername() == null ||
                request.getUsername().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Username is required");
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Password is required");
        }

        User user =
                userService.findByUsername(
                        request.getUsername()
                );

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        // Check encrypted BCrypt password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        if (!"Active".equalsIgnoreCase(
                user.getStatus())) {

            return ResponseEntity
                    .status(403)
                    .body("User account is inactive");
        }

        // Do not return password
        Map<String, Object> response = Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole(),
                "status", user.getStatus()
        );

        return ResponseEntity.ok(response);
    }


    // =========================
    // CHECK USER FOR PASSWORD RESET
    // =========================

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        if (request.getUsername() == null ||
                request.getUsername().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Username or email is required");
        }

        boolean exists =
                userService.userExists(
                        request.getUsername()
                );

        if (!exists) {

            return ResponseEntity
                    .status(404)
                    .body("User account not found");
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "User account found. You can reset your password."
                )
        );
    }


    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        if (request.getUsername() == null ||
                request.getUsername().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Username is required");
        }

        if (request.getNewPassword() == null ||
                request.getNewPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("New password is required");
        }

        if (request.getNewPassword().length() < 6) {

            return ResponseEntity
                    .badRequest()
                    .body("Password must be at least 6 characters");
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("Passwords do not match");
        }

        boolean updated =
                userService.updatePassword(
                        request.getUsername(),
                        request.getNewPassword()
                );

        if (!updated) {

            return ResponseEntity
                    .status(404)
                    .body("User account not found");
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Password reset successfully"
                )
        );
    }


    // =========================
    // LOGIN REQUEST
    // =========================

    public static class LoginRequest {

        private String username;
        private String password;

        public LoginRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    // =========================
    // FORGOT PASSWORD REQUEST
    // =========================

    public static class ForgotPasswordRequest {

        private String username;

        public ForgotPasswordRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }


    // =========================
    // RESET PASSWORD REQUEST
    // =========================

    public static class ResetPasswordRequest {

        private String username;
        private String newPassword;
        private String confirmPassword;

        public ResetPasswordRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }
}