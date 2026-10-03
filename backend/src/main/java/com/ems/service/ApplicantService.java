package com.ems.service;

import com.ems.entity.Applicant;
import com.ems.repository.ApplicantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantService {

    private final ApplicantRepository applicantRepository;

    public ApplicantService(ApplicantRepository applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    public List<Applicant> getAllApplicants() {
        return applicantRepository.findAll();
    }

    public Applicant getApplicantById(Long id) {
        return applicantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Applicant not found with id: " + id));
    }

    public List<Applicant> getApplicantsByStatus(String status) {
        return applicantRepository.findByStatus(status);
    }

    public List<Applicant> searchApplicants(String fullName) {
        return applicantRepository
                .findByFullNameContainingIgnoreCase(fullName);
    }

    public Applicant createApplicant(Applicant applicant) {

        if (applicantRepository.existsByEmail(applicant.getEmail())) {
            throw new RuntimeException(
                    "Applicant with this email already exists: "
                            + applicant.getEmail());
        }

        if (applicant.getStatus() == null ||
                applicant.getStatus().isBlank()) {
            applicant.setStatus("Active");
        }

        return applicantRepository.save(applicant);
    }

    public Applicant updateApplicant(
            Long id,
            Applicant updatedApplicant) {

        Applicant existingApplicant = getApplicantById(id);

        existingApplicant.setFullName(
                updatedApplicant.getFullName());

        existingApplicant.setEmail(
                updatedApplicant.getEmail());

        existingApplicant.setPhone(
                updatedApplicant.getPhone());

        existingApplicant.setAddress(
                updatedApplicant.getAddress());

        existingApplicant.setResumePath(
                updatedApplicant.getResumePath());

        existingApplicant.setStatus(
                updatedApplicant.getStatus());

        return applicantRepository.save(existingApplicant);
    }

    public void deleteApplicant(Long id) {

        if (!applicantRepository.existsById(id)) {
            throw new RuntimeException(
                    "Applicant not found with id: " + id);
        }

        applicantRepository.deleteById(id);
    }
}