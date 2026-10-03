package com.ems.controller;

import com.ems.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/test")
    public ResponseEntity<?> sendTestEmail(
            @RequestBody TestEmailRequest request) {

        // Validate recipient
        if (request.getTo() == null ||
                request.getTo().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Recipient email is required");
        }

        // Validate subject
        if (request.getSubject() == null ||
                request.getSubject().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email subject is required");
        }

        // Validate message
        if (request.getMessage() == null ||
                request.getMessage().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email message is required");
        }

        // Send email
        emailService.sendEmail(
                request.getTo(),
                request.getSubject(),
                request.getMessage()
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Email sent successfully"
                )
        );
    }

    public static class TestEmailRequest {

        private String to;
        private String subject;
        private String message;

        public TestEmailRequest() {
        }

        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}