package com.ems.controller;

import com.ems.entity.JobVacancy;
import com.ems.service.JobVacancyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-vacancies")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class JobVacancyController {

    private final JobVacancyService jobVacancyService;

    public JobVacancyController(
            JobVacancyService jobVacancyService) {

        this.jobVacancyService = jobVacancyService;
    }

    // =====================================================
    // Get all job vacancies
    // =====================================================

    @GetMapping
    public ResponseEntity<List<JobVacancy>> getAllVacancies() {

        return ResponseEntity.ok(
                jobVacancyService.getAllVacancies());
    }

    // =====================================================
    // Get vacancy by ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<JobVacancy> getVacancyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobVacancyService.getVacancyById(id));
    }

    // =====================================================
    // Get vacancies by status
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<JobVacancy>> getVacanciesByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                jobVacancyService.getVacanciesByStatus(status));
    }

    // =====================================================
    // Get vacancies by department
    // =====================================================

    @GetMapping("/department/{department}")
    public ResponseEntity<List<JobVacancy>> getVacanciesByDepartment(
            @PathVariable String department) {

        return ResponseEntity.ok(
                jobVacancyService.getVacanciesByDepartment(
                        department));
    }

    // =====================================================
    // Search vacancies by job title
    // =====================================================

    @GetMapping("/search")
    public ResponseEntity<List<JobVacancy>> searchVacancies(
            @RequestParam String jobTitle) {

        return ResponseEntity.ok(
                jobVacancyService.searchVacancies(
                        jobTitle));
    }

    // =====================================================
    // Create vacancy
    // =====================================================

    @PostMapping
    public ResponseEntity<JobVacancy> createVacancy(
            @RequestBody JobVacancy vacancy) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        jobVacancyService.createVacancy(
                                vacancy));
    }

    // =====================================================
    // Update vacancy
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<JobVacancy> updateVacancy(
            @PathVariable Long id,
            @RequestBody JobVacancy vacancy) {

        return ResponseEntity.ok(
                jobVacancyService.updateVacancy(
                        id,
                        vacancy));
    }

    // =====================================================
    // Delete vacancy
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacancy(
            @PathVariable Long id) {

        jobVacancyService.deleteVacancy(id);

        return ResponseEntity.noContent().build();
    }
}
