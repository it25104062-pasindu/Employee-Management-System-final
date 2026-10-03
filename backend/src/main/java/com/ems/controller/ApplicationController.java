package com.ems.controller;

import com.ems.entity.Application;
import com.ems.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(
                applicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                applicationService.getApplicationById(id));
    }

    @GetMapping("/applicant/{applicantId}")
    public ResponseEntity<List<Application>> getApplicationsByApplicant(
            @PathVariable Long applicantId) {
        return ResponseEntity.ok(
                applicationService.getApplicationsByApplicant(applicantId));
    }

    @GetMapping("/vacancy/{jobVacancyId}")
    public ResponseEntity<List<Application>> getApplicationsByJobVacancy(
            @PathVariable Long jobVacancyId) {
        return ResponseEntity.ok(
                applicationService.getApplicationsByJobVacancy(jobVacancyId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(
            @PathVariable String status) {
        return ResponseEntity.ok(
                applicationService.getApplicationsByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Application> createApplication(
            @RequestBody Application application) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(applicationService.createApplication(application));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id,
            @RequestBody Application application) {
        return ResponseEntity.ok(
                applicationService.updateApplication(id, application));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id) {
        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}