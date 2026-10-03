package com.ems.controller;

import com.ems.entity.Interview;
import com.ems.service.InterviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        return ResponseEntity.ok(
                interviewService.getAllInterviews()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                interviewService.getInterviewById(id)
        );
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<Interview>> getInterviewsByApplication(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                interviewService.getInterviewsByApplication(applicationId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Interview>> getInterviewsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                interviewService.getInterviewsByStatus(status)
        );
    }

    @GetMapping("/type/{interviewType}")
    public ResponseEntity<List<Interview>> getInterviewsByType(
            @PathVariable String interviewType) {

        return ResponseEntity.ok(
                interviewService.getInterviewsByType(interviewType)
        );
    }

    @PostMapping
    public ResponseEntity<Interview> createInterview(
            @RequestBody Interview interview) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.createInterview(interview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(
            @PathVariable Long id,
            @RequestBody Interview interview) {

        return ResponseEntity.ok(
                interviewService.updateInterview(id, interview)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(
            @PathVariable Long id) {

        interviewService.deleteInterview(id);

        return ResponseEntity.noContent().build();
    }
}