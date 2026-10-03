package com.ems.service;

import com.ems.entity.User;
import com.ems.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Find user by username
    public User findByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElse(null);
    }

    // Check whether a user exists
    public boolean userExists(String username) {

        return userRepository.existsByUsername(username);
    }

    // Update user password
    public boolean updatePassword(
            String username,
            String newPassword) {

        User user = userRepository
                .findByUsername(username)
                .orElse(null);

        if (user == null) {
            return false;
        }

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        return true;
    }

    // Create new user
    public User createUser(User user) {

        if (user.getUsername() == null ||
                user.getUsername().isBlank()) {

            throw new RuntimeException(
                    "Username is required"
            );
        }

        if (user.getPassword() == null ||
                user.getPassword().isBlank()) {

            throw new RuntimeException(
                    "Password is required"
            );
        }

        if (userRepository.existsByUsername(
                user.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        // Default role
        if (user.getRole() == null ||
                user.getRole().isBlank()) {

            user.setRole("EMPLOYEE");
        }

        // Default status
        if (user.getStatus() == null ||
                user.getStatus().isBlank()) {

            user.setStatus("Active");
        }

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }
}