package com.ems.controller;

import com.ems.entity.Applicant;
import com.ems.service.ApplicantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applicants")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class ApplicantController {

    private final ApplicantService applicantService;

    public ApplicantController(ApplicantService applicantService) {
        this.applicantService = applicantService;
    }

    @GetMapping
    public ResponseEntity<List<Applicant>> getAllApplicants() {
        return ResponseEntity.ok(
                applicantService.getAllApplicants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Applicant> getApplicantById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                applicantService.getApplicantById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Applicant>> getApplicantsByStatus(
            @PathVariable String status) {
        return ResponseEntity.ok(
                applicantService.getApplicantsByStatus(status));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Applicant>> searchApplicants(
            @RequestParam String fullName) {
        return ResponseEntity.ok(
                applicantService.searchApplicants(fullName));
    }

    @PostMapping
    public ResponseEntity<Applicant> createApplicant(
            @RequestBody Applicant applicant) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(applicantService.createApplicant(applicant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Applicant> updateApplicant(
            @PathVariable Long id,
            @RequestBody Applicant applicant) {
        return ResponseEntity.ok(
                applicantService.updateApplicant(id, applicant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicant(
            @PathVariable Long id) {
        applicantService.deleteApplicant(id);
        return ResponseEntity.noContent().build();
    }
}