package com.ems.controller;

import com.ems.entity.Training;
import com.ems.service.TrainingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class TrainingController {

    private final TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping
    public List<Training> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    @GetMapping("/{id}")
    public Training getTrainingById(
            @PathVariable Long id) {

        return trainingService.getTrainingById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Training> getTrainingsByEmployee(
            @PathVariable Long employeeId) {

        return trainingService.getTrainingsByEmployee(
                employeeId
        );
    }

    @GetMapping("/status/{status}")
    public List<Training> getTrainingsByStatus(
            @PathVariable String status) {

        return trainingService.getTrainingsByStatus(
                status
        );
    }

    @PostMapping
    public Training createTraining(
            @RequestBody Training training) {

        return trainingService.createTraining(
                training
        );
    }

    @PutMapping("/{id}")
    public Training updateTraining(
            @PathVariable Long id,
            @RequestBody Training training) {

        return trainingService.updateTraining(
                id,
                training
        );
    }

    @DeleteMapping("/{id}")
    public String deleteTraining(
            @PathVariable Long id) {

        trainingService.deleteTraining(id);

        return "Training deleted successfully";
    }
}