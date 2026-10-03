package com.ems.repository;

import com.ems.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

    List<Applicant> findByStatus(String status);

    List<Applicant> findByFullNameContainingIgnoreCase(String fullName);

    boolean existsByEmail(String email);
}