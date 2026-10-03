package com.ems.repository;

import com.ems.entity.Onboarding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OnboardingRepository extends JpaRepository<Onboarding, Long> {

    List<Onboarding> findByApplication_Id(Long applicationId);

    List<Onboarding> findByStatus(String status);
}