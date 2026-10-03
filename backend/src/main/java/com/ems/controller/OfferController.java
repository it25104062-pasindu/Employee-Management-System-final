package com.ems.controller;

import com.ems.entity.Offer;
import com.ems.service.OfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        return ResponseEntity.ok(
                offerService.getAllOffers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                offerService.getOfferById(id)
        );
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<Offer>> getOffersByApplication(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                offerService.getOffersByApplication(applicationId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Offer>> getOffersByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                offerService.getOffersByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(
            @RequestBody Offer offer) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(offerService.createOffer(offer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(
            @PathVariable Long id,
            @RequestBody Offer offer) {

        return ResponseEntity.ok(
                offerService.updateOffer(id, offer)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(
            @PathVariable Long id) {

        offerService.deleteOffer(id);

        return ResponseEntity.noContent().build();
    }
}