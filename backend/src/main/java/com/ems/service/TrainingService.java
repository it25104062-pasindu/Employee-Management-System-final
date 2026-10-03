package com.ems.service;

import com.ems.entity.Training;
import com.ems.repository.TrainingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingService {

    private final TrainingRepository trainingRepository;

    public TrainingService(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public Training getTrainingById(Long id) {
        return trainingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Training not found with id: " + id
                        )
                );
    }

    public List<Training> getTrainingsByEmployee(Long employeeId) {
        return trainingRepository.findByEmployee_Id(employeeId);
    }

    public List<Training> getTrainingsByStatus(String status) {
        return trainingRepository.findByStatus(status);
    }

    public Training createTraining(Training training) {

        if (training.getTrainingTitle() == null ||
                training.getTrainingTitle().isBlank()) {

            throw new RuntimeException(
                    "Training title is required"
            );
        }

        if (training.getEmployee() == null ||
                training.getEmployee().getId() == null) {

            throw new RuntimeException(
                    "Employee is required"
            );
        }

        if (training.getStatus() == null ||
                training.getStatus().isBlank()) {

            training.setStatus("Planned");
        }

        if (training.getStartDate() != null &&
                training.getEndDate() != null &&
                training.getEndDate().isBefore(
                        training.getStartDate())) {

            throw new RuntimeException(
                    "End date cannot be before start date"
            );
        }

        return trainingRepository.save(training);
    }

    public Training updateTraining(
            Long id,
            Training updatedTraining) {

        Training existingTraining =
                getTrainingById(id);

        if (updatedTraining.getTrainingTitle() == null ||
                updatedTraining.getTrainingTitle().isBlank()) {

            throw new RuntimeException(
                    "Training title is required"
            );
        }

        if (updatedTraining.getEmployee() == null ||
                updatedTraining.getEmployee().getId() == null) {

            throw new RuntimeException(
                    "Employee is required"
            );
        }

        if (updatedTraining.getStartDate() != null &&
                updatedTraining.getEndDate() != null &&
                updatedTraining.getEndDate().isBefore(
                        updatedTraining.getStartDate())) {

            throw new RuntimeException(
                    "End date cannot be before start date"
            );
        }

        existingTraining.setTrainingTitle(
                updatedTraining.getTrainingTitle()
        );

        existingTraining.setEmployee(
                updatedTraining.getEmployee()
        );

        existingTraining.setTrainingProvider(
                updatedTraining.getTrainingProvider()
        );

        existingTraining.setStartDate(
                updatedTraining.getStartDate()
        );

        existingTraining.setEndDate(
                updatedTraining.getEndDate()
        );

        existingTraining.setStatus(
                updatedTraining.getStatus()
        );

        existingTraining.setDescription(
                updatedTraining.getDescription()
        );

        return trainingRepository.save(
                existingTraining
        );
    }

    public void deleteTraining(Long id) {

        if (!trainingRepository.existsById(id)) {

            throw new RuntimeException(
                    "Training not found with id: " + id
            );
        }

        trainingRepository.deleteById(id);
    }
}