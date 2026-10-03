package com.ems.service;

import com.ems.entity.LeaveRequest;
import com.ems.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(
            LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    // =========================
    // GET ALL LEAVE REQUESTS
    // =========================

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    // =========================
    // GET LEAVE REQUEST BY ID
    // =========================

    public LeaveRequest getLeaveRequestById(Long id) {

        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Leave request not found with id: " + id));
    }

    // =========================
    // GET LEAVE REQUESTS BY EMPLOYEE
    // =========================

    public List<LeaveRequest> getLeaveRequestsByEmployee(
            Long employeeId) {

        return leaveRequestRepository.findByEmployee_Id(employeeId);
    }

    // =========================
    // GET LEAVE REQUESTS BY STATUS
    // =========================

    public List<LeaveRequest> getLeaveRequestsByStatus(
            String status) {

        return leaveRequestRepository.findByStatus(status);
    }

    // =========================
    // CREATE LEAVE REQUEST
    // =========================

    public LeaveRequest createLeaveRequest(
            LeaveRequest leaveRequest) {

        // New requests are Pending by default
        if (leaveRequest.getStatus() == null ||
                leaveRequest.getStatus().isBlank()) {

            leaveRequest.setStatus("Pending");
        }

        return leaveRequestRepository.save(leaveRequest);
    }

    // =========================
    // UPDATE LEAVE REQUEST
    // =========================

    public LeaveRequest updateLeaveRequest(
            Long id,
            LeaveRequest updatedLeaveRequest) {

        LeaveRequest existingLeaveRequest = getLeaveRequestById(id);

        existingLeaveRequest.setEmployee(
                updatedLeaveRequest.getEmployee());

        existingLeaveRequest.setLeaveType(
                updatedLeaveRequest.getLeaveType());

        existingLeaveRequest.setStartDate(
                updatedLeaveRequest.getStartDate());

        existingLeaveRequest.setEndDate(
                updatedLeaveRequest.getEndDate());

        existingLeaveRequest.setDays(
                updatedLeaveRequest.getDays());

        existingLeaveRequest.setReason(
                updatedLeaveRequest.getReason());

        existingLeaveRequest.setStatus(
                updatedLeaveRequest.getStatus());

        return leaveRequestRepository.save(
                existingLeaveRequest);
    }

    // =========================
    // APPROVE LEAVE REQUEST
    // =========================

    public LeaveRequest approveLeaveRequest(Long id) {

        LeaveRequest leaveRequest = getLeaveRequestById(id);

        if (!"Pending".equalsIgnoreCase(
                leaveRequest.getStatus())) {

            throw new RuntimeException(
                    "Only pending leave requests can be approved.");
        }

        leaveRequest.setStatus("Approved");

        return leaveRequestRepository.save(
                leaveRequest);
    }

    // =========================
    // REJECT LEAVE REQUEST
    // =========================

    public LeaveRequest rejectLeaveRequest(Long id) {

        LeaveRequest leaveRequest = getLeaveRequestById(id);

        if (!"Pending".equalsIgnoreCase(
                leaveRequest.getStatus())) {

            throw new RuntimeException(
                    "Only pending leave requests can be rejected.");
        }

        leaveRequest.setStatus("Rejected");

        return leaveRequestRepository.save(
                leaveRequest);
    }

    // =========================
    // DELETE LEAVE REQUEST
    // =========================

    public void deleteLeaveRequest(Long id) {

        if (!leaveRequestRepository.existsById(id)) {

            throw new RuntimeException(
                    "Leave request not found with id: " + id);
        }

        leaveRequestRepository.deleteById(id);
    }
}