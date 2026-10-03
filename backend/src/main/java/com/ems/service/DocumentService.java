package com.ems.service;

import com.ems.entity.Document;
import com.ems.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Document not found with id: " + id
                        )
                );
    }

    public List<Document> getDocumentsByOnboarding(Long onboardingId) {
        return documentRepository.findByOnboarding_Id(onboardingId);
    }

    public List<Document> getDocumentsByStatus(String status) {
        return documentRepository.findByStatus(status);
    }

    public List<Document> getDocumentsByType(String documentType) {
        return documentRepository.findByDocumentType(documentType);
    }

    public Document createDocument(Document document) {

        if (document.getStatus() == null ||
                document.getStatus().isBlank()) {
            document.setStatus("Pending");
        }

        return documentRepository.save(document);
    }

    public Document updateDocument(
            Long id,
            Document updatedDocument) {

        Document existingDocument = getDocumentById(id);

        existingDocument.setOnboarding(
                updatedDocument.getOnboarding()
        );

        existingDocument.setDocumentName(
                updatedDocument.getDocumentName()
        );

        existingDocument.setDocumentType(
                updatedDocument.getDocumentType()
        );

        existingDocument.setSubmittedDate(
                updatedDocument.getSubmittedDate()
        );

        existingDocument.setStatus(
                updatedDocument.getStatus()
        );

        existingDocument.setNotes(
                updatedDocument.getNotes()
        );

        return documentRepository.save(existingDocument);
    }

    public void deleteDocument(Long id) {

        if (!documentRepository.existsById(id)) {
            throw new RuntimeException(
                    "Document not found with id: " + id
            );
        }

        documentRepository.deleteById(id);
    }
}