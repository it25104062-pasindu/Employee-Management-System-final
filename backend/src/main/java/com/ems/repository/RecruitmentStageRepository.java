package com.ems.repository;

import com.ems.entity.RecruitmentStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecruitmentStageRepository
        extends JpaRepository<RecruitmentStage, Long> {

    List<RecruitmentStage> findByApplication_Id(Long applicationId);

    List<RecruitmentStage> findByStageName(String stageName);

    List<RecruitmentStage> findByStatus(String status);
}