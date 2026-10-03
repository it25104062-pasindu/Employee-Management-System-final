package com.ems.service;

import com.ems.entity.Application;
import com.ems.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found with id: " + id));
    }

    public List<Application> getApplicationsByApplicant(Long applicantId) {
        return applicationRepository.findByApplicant_Id(applicantId);
    }

    public List<Application> getApplicationsByJobVacancy(Long jobVacancyId) {
        return applicationRepository.findByJobVacancy_Id(jobVacancyId);
    }

    public List<Application> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status);
    }

    public Application createApplication(Application application) {

        if (application.getStatus() == null ||
                application.getStatus().isBlank()) {
            application.setStatus("Applied");
        }

        return applicationRepository.save(application);
    }

    public Application updateApplication(
            Long id,
            Application updatedApplication) {

        Application existingApplication = getApplicationById(id);

        existingApplication.setApplicant(
                updatedApplication.getApplicant());

        existingApplication.setJobVacancy(
                updatedApplication.getJobVacancy());

        existingApplication.setApplicationDate(
                updatedApplication.getApplicationDate());

        existingApplication.setStatus(
                updatedApplication.getStatus());

        existingApplication.setNotes(
                updatedApplication.getNotes());

        return applicationRepository.save(existingApplication);
    }

    public void deleteApplication(Long id) {

        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException(
                    "Application not found with id: " + id);
        }

        applicationRepository.deleteById(id);
    }
}