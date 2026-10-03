package com.ems.repository;

import com.ems.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByApplication_Id(Long applicationId);

    List<Interview> findByStatus(String status);

    List<Interview> findByInterviewType(String interviewType);
}