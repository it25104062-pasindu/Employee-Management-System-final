package com.ems.repository;

import com.ems.entity.OnboardingTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OnboardingTaskRepository extends JpaRepository<OnboardingTask, Long> {

    List<OnboardingTask> findByOnboarding_Id(Long onboardingId);

    List<OnboardingTask> findByStatus(String status);
}