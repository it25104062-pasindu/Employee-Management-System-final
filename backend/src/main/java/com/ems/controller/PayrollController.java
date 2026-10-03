package com.ems.controller;

import com.ems.entity.Payroll;
import com.ems.service.EmailService;
import com.ems.service.PayrollService;
import com.ems.util.PayslipGenerator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class PayrollController {

    private final PayrollService payrollService;
    private final EmailService emailService;

    public PayrollController(
            PayrollService payrollService,
            EmailService emailService) {

        this.payrollService = payrollService;
        this.emailService = emailService;
    }

    // =====================================================
    // Get all payroll records
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {

        return ResponseEntity.ok(
                payrollService.getAllPayrolls());
    }

    // =====================================================
    // Get payroll by ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getPayrollById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                payrollService.getPayrollById(id));
    }

    // =====================================================
    // Get payroll records by employee
    // =====================================================

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollsByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                payrollService.getPayrollsByEmployee(employeeId));
    }

    // =====================================================
    // Get payroll records by month
    // =====================================================

    @GetMapping("/month/{payrollMonth}")
    public ResponseEntity<List<Payroll>> getPayrollsByMonth(
            @PathVariable String payrollMonth) {

        return ResponseEntity.ok(
                payrollService.getPayrollsByMonth(payrollMonth));
    }

    // =====================================================
    // Get payroll records by status
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payroll>> getPayrollsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                payrollService.getPayrollsByStatus(status));
    }

    // =====================================================
    // Create payroll
    // Automatically send payslip email
    // =====================================================

    @PostMapping
    public ResponseEntity<Payroll> createPayroll(
            @RequestBody Payroll payroll) {

        try {

            // 1. Save payroll to database
            Payroll savedPayroll =
                    payrollService.createPayroll(payroll);

            // 2. Get employee email
            String employeeEmail =
                    savedPayroll.getEmployee().getEmail();

            // 3. Check whether employee has an email
            if (employeeEmail != null &&
                    !employeeEmail.isBlank()) {

                String employeeName =
                        savedPayroll.getEmployee().getName();

                // 4. Generate payslip PDF
                byte[] pdf =
                        PayslipGenerator.generatePayslip(
                                savedPayroll);

                // 5. Create email subject
                String subject =
                        "Payslip - "
                                + savedPayroll.getPayrollMonth();

                // 6. Create email message
                String message =
                        "Dear " + employeeName + ",\n\n"
                                + "Your payslip for "
                                + savedPayroll.getPayrollMonth()
                                + " has been generated.\n\n"
                                + "Please find your payslip attached to this email.\n\n"
                                + "Net Salary: LKR "
                                + savedPayroll.getNetSalary()
                                + "\n\n"
                                + "Regards,\n"
                                + "Employee Management System";

                // 7. Send email with PDF attachment
                emailService.sendEmailWithAttachment(
                        employeeEmail,
                        subject,
                        message,
                        pdf,
                        "payslip-"
                                + savedPayroll.getId()
                                + ".pdf"
                );

            } else {

                // Employee does not have an email
                System.out.println(
                        "Payslip email skipped: "
                                + "Employee email is missing."
                );
            }

            // 8. Return successfully created payroll
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedPayroll);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    // =====================================================
    // Update payroll
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Payroll> updatePayroll(
            @PathVariable Long id,
            @RequestBody Payroll payroll) {

        return ResponseEntity.ok(
                payrollService.updatePayroll(
                        id,
                        payroll));
    }

    // =====================================================
    // Delete payroll
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(
            @PathVariable Long id) {

        payrollService.deletePayroll(id);

        return ResponseEntity.noContent().build();
    }

    // =====================================================
    // Generate and download payslip PDF
    // =====================================================

    @GetMapping("/{id}/payslip")
    public ResponseEntity<byte[]> downloadPayslip(
            @PathVariable Long id) {

        Payroll payroll =
                payrollService.getPayrollById(id);

        byte[] pdf =
                PayslipGenerator.generatePayslip(payroll);

        return ResponseEntity.ok()
                .header(
                        "Content-Disposition",
                        "attachment; filename=payslip-"
                                + id
                                + ".pdf")
                .header(
                        "Content-Type",
                        "application/pdf")
                .body(pdf);
    }

    // =====================================================
    // Send payslip PDF by email manually
    // =====================================================

    @PostMapping("/{id}/send-payslip-email")
    public ResponseEntity<?> sendPayslipByEmail(
            @PathVariable Long id) {

        try {

            // 1. Get payroll
            Payroll payroll =
                    payrollService.getPayrollById(id);

            // 2. Get employee email
            String employeeEmail =
                    payroll.getEmployee().getEmail();

            // 3. Check employee email
            if (employeeEmail == null ||
                    employeeEmail.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Employee email address is missing"
                        );
            }

            String employeeName =
                    payroll.getEmployee().getName();

            // 4. Generate payslip PDF
            byte[] pdf =
                    PayslipGenerator.generatePayslip(
                            payroll);

            // 5. Create email subject
            String subject =
                    "Payslip - "
                            + payroll.getPayrollMonth();

            // 6. Create email message
            String message =
                    "Dear " + employeeName + ",\n\n"
                            + "Your payslip for "
                            + payroll.getPayrollMonth()
                            + " has been generated.\n\n"
                            + "Please find your payslip attached to this email.\n\n"
                            + "Net Salary: LKR "
                            + payroll.getNetSalary()
                            + "\n\n"
                            + "Regards,\n"
                            + "Employee Management System";

            // 7. Send email with PDF attachment
            emailService.sendEmailWithAttachment(
                    employeeEmail,
                    subject,
                    message,
                    pdf,
                    "payslip-"
                            + id
                            + ".pdf"
            );

            // 8. Return success response
            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Payslip emailed successfully"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Failed to send payslip email"
                    );
        }
    }
}