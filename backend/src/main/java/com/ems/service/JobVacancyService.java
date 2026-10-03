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

        if (vacancy.getStatus() == null ||
                vacancy.getStatus().isBlank()) {

            vacancy.setStatus("Open");
        }

        return jobVacancyRepository.save(vacancy);
    }

    // Update vacancy
    public JobVacancy updateVacancy(
            Long id,
            JobVacancy updatedVacancy) {

        JobVacancy existingVacancy = getVacancyById(id);

        existingVacancy.setJobTitle(
                updatedVacancy.getJobTitle());

        existingVacancy.setDepartment(
                updatedVacancy.getDepartment());

        existingVacancy.setPosition(
                updatedVacancy.getPosition());

        existingVacancy.setDescription(
                updatedVacancy.getDescription());

        existingVacancy.setRequirements(
                updatedVacancy.getRequirements());

        existingVacancy.setOpeningDate(
                updatedVacancy.getOpeningDate());

        existingVacancy.setClosingDate(
                updatedVacancy.getClosingDate());

        existingVacancy.setStatus(
                updatedVacancy.getStatus());

        return jobVacancyRepository.save(
                existingVacancy);
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