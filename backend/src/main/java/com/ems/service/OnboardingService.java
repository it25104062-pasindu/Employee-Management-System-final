package com.ems.service;

import com.ems.entity.Onboarding;
import com.ems.repository.OnboardingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnboardingService {

    private final OnboardingRepository onboardingRepository;

    public OnboardingService(OnboardingRepository onboardingRepository) {
        this.onboardingRepository = onboardingRepository;
    }

    public List<Onboarding> getAllOnboardings() {
        return onboardingRepository.findAll();
    }

    public Onboarding getOnboardingById(Long id) {
        return onboardingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Onboarding record not found with id: " + id
                        )
                );
    }

    public List<Onboarding> getOnboardingsByApplication(Long applicationId) {
        return onboardingRepository.findByApplication_Id(applicationId);
    }

    public List<Onboarding> getOnboardingsByStatus(String status) {
        return onboardingRepository.findByStatus(status);
    }

    public Onboarding createOnboarding(Onboarding onboarding) {

        if (onboarding.getStatus() == null ||
                onboarding.getStatus().isBlank()) {
            onboarding.setStatus("Pending");
        }

        return onboardingRepository.save(onboarding);
    }

    public Onboarding updateOnboarding(
            Long id,
            Onboarding updatedOnboarding) {

        Onboarding existingOnboarding = getOnboardingById(id);

        existingOnboarding.setApplication(
                updatedOnboarding.getApplication()
        );

        existingOnboarding.setStartDate(
                updatedOnboarding.getStartDate()
        );

        existingOnboarding.setCompletionDate(
                updatedOnboarding.getCompletionDate()
        );

        existingOnboarding.setStatus(
                updatedOnboarding.getStatus()
        );

        existingOnboarding.setNotes(
                updatedOnboarding.getNotes()
        );

        return onboardingRepository.save(existingOnboarding);
    }

    public void deleteOnboarding(Long id) {

        if (!onboardingRepository.existsById(id)) {
            throw new RuntimeException(
                    "Onboarding record not found with id: " + id
            );
        }

        onboardingRepository.deleteById(id);
    }
}