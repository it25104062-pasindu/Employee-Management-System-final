package com.ems.controller;

import com.ems.entity.OnboardingTask;
import com.ems.service.OnboardingTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/onboarding-tasks")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class OnboardingTaskController {

    private final OnboardingTaskService onboardingTaskService;

    public OnboardingTaskController(
            OnboardingTaskService onboardingTaskService) {
        this.onboardingTaskService = onboardingTaskService;
    }

    @GetMapping
    public ResponseEntity<List<OnboardingTask>> getAllTasks() {
        return ResponseEntity.ok(
                onboardingTaskService.getAllTasks()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<OnboardingTask> getTaskById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                onboardingTaskService.getTaskById(id)
        );
    }

    @GetMapping("/onboarding/{onboardingId}")
    public ResponseEntity<List<OnboardingTask>> getTasksByOnboarding(
            @PathVariable Long onboardingId) {

        return ResponseEntity.ok(
                onboardingTaskService.getTasksByOnboarding(onboardingId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<OnboardingTask>> getTasksByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                onboardingTaskService.getTasksByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<OnboardingTask> createTask(
            @RequestBody OnboardingTask task) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(onboardingTaskService.createTask(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OnboardingTask> updateTask(
            @PathVariable Long id,
            @RequestBody OnboardingTask task) {

        return ResponseEntity.ok(
                onboardingTaskService.updateTask(id, task)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id) {

        onboardingTaskService.deleteTask(id);

        return ResponseEntity.noContent().build();
    }
}