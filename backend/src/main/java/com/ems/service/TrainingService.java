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

        validateTraining(training);

        return trainingRepository.save(training);
    }

    public Training updateTraining(
            Long id,
            Training updatedTraining) {

        Training existingTraining = getTrainingById(id);

        validateTraining(updatedTraining);

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

        return trainingRepository.save(existingTraining);
    }

    public void deleteTraining(Long id) {

        if (!trainingRepository.existsById(id)) {

            throw new RuntimeException(
                    "Training not found with id: " + id
            );
        }

        trainingRepository.deleteById(id);
    }

    private void validateTraining(Training training) {

        if (training == null) {
            throw new RuntimeException(
                    "Training data is required"
            );
        }

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

        training.setTrainingTitle(
                training.getTrainingTitle().trim()
        );

        training.setStatus(
                training.getStatus().trim()
        );

        if (training.getTrainingProvider() != null) {
            training.setTrainingProvider(
                    training.getTrainingProvider().trim()
            );
        }

        if (training.getDescription() != null) {
            training.setDescription(
                    training.getDescription().trim()
            );
        }
    }
}