package com.ems.repository;

import com.ems.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByApplication_Id(Long applicationId);

    List<Offer> findByStatus(String status);
}