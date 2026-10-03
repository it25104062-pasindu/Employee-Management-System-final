package com.ems.service;

import com.ems.entity.OnboardingTask;
import com.ems.repository.OnboardingTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnboardingTaskService {

    private final OnboardingTaskRepository onboardingTaskRepository;

    public OnboardingTaskService(
            OnboardingTaskRepository onboardingTaskRepository) {
        this.onboardingTaskRepository = onboardingTaskRepository;
    }

    public List<OnboardingTask> getAllTasks() {
        return onboardingTaskRepository.findAll();
    }

    public OnboardingTask getTaskById(Long id) {
        return onboardingTaskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Onboarding task not found with id: " + id
                        )
                );
    }

    public List<OnboardingTask> getTasksByOnboarding(Long onboardingId) {
        return onboardingTaskRepository.findByOnboarding_Id(onboardingId);
    }

    public List<OnboardingTask> getTasksByStatus(String status) {
        return onboardingTaskRepository.findByStatus(status);
    }

    public OnboardingTask createTask(OnboardingTask task) {

        if (task.getStatus() == null ||
                task.getStatus().isBlank()) {
            task.setStatus("Pending");
        }

        return onboardingTaskRepository.save(task);
    }

    public OnboardingTask updateTask(
            Long id,
            OnboardingTask updatedTask) {

        OnboardingTask existingTask = getTaskById(id);

        existingTask.setOnboarding(
                updatedTask.getOnboarding()
        );

        existingTask.setTaskName(
                updatedTask.getTaskName()
        );

        existingTask.setDescription(
                updatedTask.getDescription()
        );

        existingTask.setDueDate(
                updatedTask.getDueDate()
        );

        existingTask.setStatus(
                updatedTask.getStatus()
        );

        return onboardingTaskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {

        if (!onboardingTaskRepository.existsById(id)) {
            throw new RuntimeException(
                    "Onboarding task not found with id: " + id
            );
        }

        onboardingTaskRepository.deleteById(id);
    }
}