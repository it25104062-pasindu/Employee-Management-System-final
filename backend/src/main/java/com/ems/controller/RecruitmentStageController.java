package com.ems.controller;

import com.ems.entity.RecruitmentStage;
import com.ems.service.RecruitmentStageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruitment-stages")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class RecruitmentStageController {

    private final RecruitmentStageService recruitmentStageService;

    public RecruitmentStageController(
            RecruitmentStageService recruitmentStageService) {
        this.recruitmentStageService = recruitmentStageService;
    }

    @GetMapping
    public ResponseEntity<List<RecruitmentStage>> getAllStages() {
        return ResponseEntity.ok(
                recruitmentStageService.getAllStages()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecruitmentStage> getStageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                recruitmentStageService.getStageById(id)
        );
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<RecruitmentStage>> getStagesByApplication(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                recruitmentStageService
                        .getStagesByApplication(applicationId)
        );
    }

    @GetMapping("/name/{stageName}")
    public ResponseEntity<List<RecruitmentStage>> getStagesByStageName(
            @PathVariable String stageName) {

        return ResponseEntity.ok(
                recruitmentStageService
                        .getStagesByStageName(stageName)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<RecruitmentStage>> getStagesByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                recruitmentStageService
                        .getStagesByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<RecruitmentStage> createStage(
            @RequestBody RecruitmentStage stage) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(recruitmentStageService.createStage(stage));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecruitmentStage> updateStage(
            @PathVariable Long id,
            @RequestBody RecruitmentStage stage) {

        return ResponseEntity.ok(
                recruitmentStageService.updateStage(id, stage)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(
            @PathVariable Long id) {

        recruitmentStageService.deleteStage(id);

        return ResponseEntity.noContent().build();
    }
}