package com.ems.service;

import com.ems.entity.Payroll;
import com.ems.repository.PayrollRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    // Get all payroll records
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    // Get payroll by ID
    public Payroll getPayrollById(Long id) {
        return payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Payroll record not found with id: " + id));
    }

    // Get payroll records by employee
    public List<Payroll> getPayrollsByEmployee(Long employeeId) {
        return payrollRepository.findByEmployee_Id(employeeId);
    }

    // Get payroll records by month
    public List<Payroll> getPayrollsByMonth(String payrollMonth) {
        return payrollRepository.findByPayrollMonth(payrollMonth);
    }

    // Get payroll records by status
    public List<Payroll> getPayrollsByStatus(String status) {
        return payrollRepository.findByStatus(status);
    }

    // Create payroll
    public Payroll createPayroll(Payroll payroll) {

        BigDecimal basicSalary = payroll.getBasicSalary() != null
                ? payroll.getBasicSalary()
                : BigDecimal.ZERO;

        BigDecimal allowances = payroll.getAllowances() != null
                ? payroll.getAllowances()
                : BigDecimal.ZERO;

        BigDecimal deductions = payroll.getDeductions() != null
                ? payroll.getDeductions()
                : BigDecimal.ZERO;

        // Net Salary = Basic Salary + Allowances - Deductions
        BigDecimal netSalary = basicSalary
                .add(allowances)
                .subtract(deductions);

        payroll.setBasicSalary(basicSalary);
        payroll.setAllowances(allowances);
        payroll.setDeductions(deductions);
        payroll.setNetSalary(netSalary);

        if (payroll.getStatus() == null ||
                payroll.getStatus().isBlank()) {

            payroll.setStatus("Generated");
        }

        return payrollRepository.save(payroll);
    }

    // Update payroll
    public Payroll updatePayroll(
            Long id,
            Payroll updatedPayroll) {

        Payroll existingPayroll = getPayrollById(id);

        existingPayroll.setEmployee(
                updatedPayroll.getEmployee());

        existingPayroll.setPayrollMonth(
                updatedPayroll.getPayrollMonth());

        BigDecimal basicSalary = updatedPayroll.getBasicSalary() != null
                ? updatedPayroll.getBasicSalary()
                : BigDecimal.ZERO;

        BigDecimal allowances = updatedPayroll.getAllowances() != null
                ? updatedPayroll.getAllowances()
                : BigDecimal.ZERO;

        BigDecimal deductions = updatedPayroll.getDeductions() != null
                ? updatedPayroll.getDeductions()
                : BigDecimal.ZERO;

        BigDecimal netSalary = basicSalary
                .add(allowances)
                .subtract(deductions);

        existingPayroll.setBasicSalary(basicSalary);
        existingPayroll.setAllowances(allowances);
        existingPayroll.setDeductions(deductions);
        existingPayroll.setNetSalary(netSalary);

        existingPayroll.setStatus(
                updatedPayroll.getStatus());

        return payrollRepository.save(existingPayroll);
    }

    // Delete payroll
    public void deletePayroll(Long id) {

        if (!payrollRepository.existsById(id)) {

            throw new RuntimeException(
                    "Payroll record not found with id: " + id);
        }

        payrollRepository.deleteById(id);
    }
}