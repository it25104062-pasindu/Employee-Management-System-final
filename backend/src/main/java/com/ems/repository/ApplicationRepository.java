package com.ems.repository;

import com.ems.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByApplicant_Id(Long applicantId);

    List<Application> findByJobVacancy_Id(Long jobVacancyId);

    List<Application> findByStatus(String status);
}