package com.ems.controller;

import com.ems.entity.Onboarding;
import com.ems.service.OnboardingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/onboarding")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @GetMapping
    public ResponseEntity<List<Onboarding>> getAllOnboardings() {
        return ResponseEntity.ok(
                onboardingService.getAllOnboardings()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Onboarding> getOnboardingById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                onboardingService.getOnboardingById(id)
        );
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<Onboarding>> getOnboardingsByApplication(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                onboardingService.getOnboardingsByApplication(applicationId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Onboarding>> getOnboardingsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                onboardingService.getOnboardingsByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<Onboarding> createOnboarding(
            @RequestBody Onboarding onboarding) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(onboardingService.createOnboarding(onboarding));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Onboarding> updateOnboarding(
            @PathVariable Long id,
            @RequestBody Onboarding onboarding) {

        return ResponseEntity.ok(
                onboardingService.updateOnboarding(id, onboarding)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOnboarding(
            @PathVariable Long id) {

        onboardingService.deleteOnboarding(id);

        return ResponseEntity.noContent().build();
    }
}