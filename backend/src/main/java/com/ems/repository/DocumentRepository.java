package com.ems.repository;

import com.ems.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByOnboarding_Id(Long onboardingId);

    List<Document> findByStatus(String status);

    List<Document> findByDocumentType(String documentType);
}
