package com.ems.service;

import com.ems.entity.JobVacancy;
import com.ems.repository.JobVacancyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobVacancyService {

    private final JobVacancyRepository jobVacancyRepository;

    public JobVacancyService(
            JobVacancyRepository jobVacancyRepository) {

        this.jobVacancyRepository = jobVacancyRepository;
    }

    // Get all job vacancies
    public List<JobVacancy> getAllVacancies() {

        return jobVacancyRepository.findAll();
    }

    // Get vacancy by ID
    public JobVacancy getVacancyById(Long id) {

        return jobVacancyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Job vacancy not found with id: " + id));
    }

    // Get vacancies by status
    public List<JobVacancy> getVacanciesByStatus(
            String status) {

        return jobVacancyRepository.findByStatus(status);
    }

    // Get vacancies by department
    public List<JobVacancy> getVacanciesByDepartment(
            String department) {

        return jobVacancyRepository.findByDepartment(
                department);
    }

    // Search vacancies by job title
    public List<JobVacancy> searchVacancies(
            String jobTitle) {

        return jobVacancyRepository
                .findByJobTitleContainingIgnoreCase(
                        jobTitle);
    }

    // Create vacancy
    public JobVacancy createVacancy(
            JobVacancy vacancy) {

        validateVacancy(vacancy);

        vacancy.setJobTitle(
                vacancy.getJobTitle().trim()
        );

        if (vacancy.getDepartment() != null) {
            vacancy.setDepartment(
                    vacancy.getDepartment().trim()
            );
        }

        if (vacancy.getPosition() != null) {
            vacancy.setPosition(
                    vacancy.getPosition().trim()
            );
        }

        if (vacancy.getStatus() == null ||
                vacancy.getStatus().isBlank()) {

            vacancy.setStatus("Open");

        } else {

            vacancy.setStatus(
                    vacancy.getStatus().trim()
            );
        }

        return jobVacancyRepository.save(vacancy);
    }

    // Update vacancy
    public JobVacancy updateVacancy(
            Long id,
            JobVacancy updatedVacancy) {

        JobVacancy existingVacancy = getVacancyById(id);

        validateVacancy(updatedVacancy);

        existingVacancy.setJobTitle(
                updatedVacancy.getJobTitle().trim()
        );

        existingVacancy.setDepartment(
                updatedVacancy.getDepartment() != null
                        ? updatedVacancy.getDepartment().trim()
                        : null
        );

        existingVacancy.setPosition(
                updatedVacancy.getPosition() != null
                        ? updatedVacancy.getPosition().trim()
                        : null
        );

        existingVacancy.setDescription(
                updatedVacancy.getDescription());

        existingVacancy.setRequirements(
                updatedVacancy.getRequirements());

        existingVacancy.setOpeningDate(
                updatedVacancy.getOpeningDate());

        existingVacancy.setClosingDate(
                updatedVacancy.getClosingDate());

        if (updatedVacancy.getStatus() == null ||
                updatedVacancy.getStatus().isBlank()) {

            existingVacancy.setStatus("Open");

        } else {

            existingVacancy.setStatus(
                    updatedVacancy.getStatus().trim()
            );
        }

        return jobVacancyRepository.save(
                existingVacancy);
    }

    // Vacancy validation
    private void validateVacancy(
            JobVacancy vacancy) {

        if (vacancy == null) {
            throw new RuntimeException(
                    "Job vacancy data is required"
            );
        }

        if (vacancy.getJobTitle() == null ||
                vacancy.getJobTitle().isBlank()) {

            throw new RuntimeException(
                    "Job title is required"
            );
        }

        if (vacancy.getOpeningDate() != null &&
                vacancy.getClosingDate() != null &&
                vacancy.getClosingDate().isBefore(
                        vacancy.getOpeningDate()
                )) {

            throw new RuntimeException(
                    "Closing date cannot be before opening date"
            );
        }
    }

    // Delete vacancy
    public void deleteVacancy(Long id) {

        if (!jobVacancyRepository.existsById(id)) {

            throw new RuntimeException(
                    "Job vacancy not found with id: " + id);
        }

        jobVacancyRepository.deleteById(id);
    }
}