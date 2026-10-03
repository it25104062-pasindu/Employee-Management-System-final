package com.ems.controller;

import com.ems.entity.LeaveRequest;
import com.ems.service.LeaveRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(
            LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // =========================
    // GET ALL LEAVE REQUESTS
    // =========================

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {

        return ResponseEntity.ok(
                leaveRequestService.getAllLeaveRequests());
    }

    // =========================
    // GET LEAVE REQUEST BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getLeaveRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveRequestService.getLeaveRequestById(id));
    }

    // =========================
    // GET BY EMPLOYEE
    // =========================

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                leaveRequestService.getLeaveRequestsByEmployee(
                        employeeId));
    }

    // =========================
    // GET BY STATUS
    // =========================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                leaveRequestService.getLeaveRequestsByStatus(
                        status));
    }

    // =========================
    // CREATE LEAVE REQUEST
    // =========================

    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(
            @RequestBody LeaveRequest leaveRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        leaveRequestService.createLeaveRequest(
                                leaveRequest));
    }

    // =========================
    // UPDATE LEAVE REQUEST
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequest> updateLeaveRequest(
            @PathVariable Long id,
            @RequestBody LeaveRequest leaveRequest) {

        return ResponseEntity.ok(
                leaveRequestService.updateLeaveRequest(
                        id,
                        leaveRequest));
    }

    // =========================
    // APPROVE LEAVE REQUEST
    // =========================

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeaveRequest(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveRequestService.approveLeaveRequest(id));
    }

    // =========================
    // REJECT LEAVE REQUEST
    // =========================

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeaveRequest(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveRequestService.rejectLeaveRequest(id));
    }

    // =========================
    // DELETE LEAVE REQUEST
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(
            @PathVariable Long id) {

        leaveRequestService.deleteLeaveRequest(id);

        return ResponseEntity.noContent().build();
    }
}