package com.ems.repository;

import com.ems.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    List<Payroll> findByEmployee_Id(Long employeeId);

    List<Payroll> findByPayrollMonth(String payrollMonth);

    List<Payroll> findByStatus(String status);
}