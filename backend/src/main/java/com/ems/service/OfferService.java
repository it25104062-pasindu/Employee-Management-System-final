package com.ems.service;

import com.ems.entity.Offer;
import com.ems.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer getOfferById(Long id) {
        return offerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Offer not found with id: " + id
                        )
                );
    }

    public List<Offer> getOffersByApplication(Long applicationId) {
        return offerRepository.findByApplication_Id(applicationId);
    }

    public List<Offer> getOffersByStatus(String status) {
        return offerRepository.findByStatus(status);
    }

    public Offer createOffer(Offer offer) {

        if (offer.getSalary() == null) {
            offer.setSalary(BigDecimal.ZERO);
        }

        if (offer.getStatus() == null ||
                offer.getStatus().isBlank()) {
            offer.setStatus("Pending");
        }

        return offerRepository.save(offer);
    }

    public Offer updateOffer(
            Long id,
            Offer updatedOffer) {

        Offer existingOffer = getOfferById(id);

        existingOffer.setApplication(
                updatedOffer.getApplication()
        );

        existingOffer.setOfferDate(
                updatedOffer.getOfferDate()
        );

        existingOffer.setJoiningDate(
                updatedOffer.getJoiningDate()
        );

        existingOffer.setSalary(
                updatedOffer.getSalary()
        );

        existingOffer.setJobTitle(
                updatedOffer.getJobTitle()
        );

        existingOffer.setTerms(
                updatedOffer.getTerms()
        );

        existingOffer.setStatus(
                updatedOffer.getStatus()
        );

        return offerRepository.save(existingOffer);
    }

    public void deleteOffer(Long id) {

        if (!offerRepository.existsById(id)) {
            throw new RuntimeException(
                    "Offer not found with id: " + id
            );
        }

        offerRepository.deleteById(id);
    }
}