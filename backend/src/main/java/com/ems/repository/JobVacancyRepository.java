package com.ems.repository;

import com.ems.entity.JobVacancy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobVacancyRepository extends JpaRepository<JobVacancy, Long> {

    List<JobVacancy> findByStatus(String status);

    List<JobVacancy> findByDepartment(String department);

    List<JobVacancy> findByJobTitleContainingIgnoreCase(String jobTitle);
}