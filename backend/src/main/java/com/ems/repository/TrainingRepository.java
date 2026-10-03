package com.ems.repository;

import com.ems.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Long> {

    List<Training> findByEmployee_Id(Long employeeId);

    List<Training> findByStatus(String status);
}