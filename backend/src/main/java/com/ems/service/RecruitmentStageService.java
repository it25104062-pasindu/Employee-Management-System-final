package com.ems.service;

import com.ems.entity.RecruitmentStage;
import com.ems.repository.RecruitmentStageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruitmentStageService {

    private final RecruitmentStageRepository recruitmentStageRepository;

    public RecruitmentStageService(
            RecruitmentStageRepository recruitmentStageRepository) {
        this.recruitmentStageRepository = recruitmentStageRepository;
    }

    public List<RecruitmentStage> getAllStages() {
        return recruitmentStageRepository.findAll();
    }

    public RecruitmentStage getStageById(Long id) {
        return recruitmentStageRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recruitment stage not found with id: " + id
                        )
                );
    }

    public List<RecruitmentStage> getStagesByApplication(Long applicationId) {
        return recruitmentStageRepository
                .findByApplication_Id(applicationId);
    }

    public List<RecruitmentStage> getStagesByStageName(String stageName) {
        return recruitmentStageRepository.findByStageName(stageName);
    }

    public List<RecruitmentStage> getStagesByStatus(String status) {
        return recruitmentStageRepository.findByStatus(status);
    }

    public RecruitmentStage createStage(RecruitmentStage stage) {

        if (stage.getStatus() == null ||
                stage.getStatus().isBlank()) {
            stage.setStatus("Pending");
        }

        return recruitmentStageRepository.save(stage);
    }

    public RecruitmentStage updateStage(
            Long id,
            RecruitmentStage updatedStage) {

        RecruitmentStage existingStage = getStageById(id);

        existingStage.setApplication(
                updatedStage.getApplication()
        );

        existingStage.setStageName(
                updatedStage.getStageName()
        );

        existingStage.setStageDate(
                updatedStage.getStageDate()
        );

        existingStage.setNotes(
                updatedStage.getNotes()
        );

        existingStage.setStatus(
                updatedStage.getStatus()
        );

        return recruitmentStageRepository.save(existingStage);
    }

    public void deleteStage(Long id) {

        if (!recruitmentStageRepository.existsById(id)) {
            throw new RuntimeException(
                    "Recruitment stage not found with id: " + id
            );
        }

        recruitmentStageRepository.deleteById(id);
    }
}