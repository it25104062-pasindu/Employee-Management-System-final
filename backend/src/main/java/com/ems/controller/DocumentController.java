package com.ems.controller;

import com.ems.entity.Document;
import com.ems.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(
                documentService.getAllDocuments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                documentService.getDocumentById(id)
        );
    }

    @GetMapping("/onboarding/{onboardingId}")
    public ResponseEntity<List<Document>> getDocumentsByOnboarding(
            @PathVariable Long onboardingId) {

        return ResponseEntity.ok(
                documentService.getDocumentsByOnboarding(
                        onboardingId
                )
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Document>> getDocumentsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                documentService.getDocumentsByStatus(status)
        );
    }

    @GetMapping("/type/{documentType}")
    public ResponseEntity<List<Document>> getDocumentsByType(
            @PathVariable String documentType) {

        return ResponseEntity.ok(
                documentService.getDocumentsByType(documentType)
        );
    }

    @PostMapping
    public ResponseEntity<Document> createDocument(
            @RequestBody Document document) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(documentService.createDocument(document));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(
            @PathVariable Long id,
            @RequestBody Document document) {

        return ResponseEntity.ok(
                documentService.updateDocument(id, document)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long id) {

        documentService.deleteDocument(id);

        return ResponseEntity.noContent().build();
    }
}