package com.ems.service;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found with id: " + id
                        )
                );
    }

    public Employee createEmployee(Employee employee) {

        // Required field validation
        if (employee.getEmployeeCode() == null ||
                employee.getEmployeeCode().isBlank()) {

            throw new RuntimeException(
                    "Employee code is required"
            );
        }

        if (employee.getName() == null ||
                employee.getName().isBlank()) {

            throw new RuntimeException(
                    "Employee name is required"
            );
        }

        if (employee.getEmail() == null ||
                employee.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Employee email is required"
            );
        }

        // Phone number validation
        if (employee.getPhone() != null &&
                !employee.getPhone().isBlank()) {

            if (!employee.getPhone().matches("\\d{10}")) {

                throw new RuntimeException(
                        "Phone number must contain exactly 10 digits"
                );
            }
        }

        // Date validation
        if (employee.getJoinDate() != null &&
                employee.getDateOfBirth() != null &&
                employee.getJoinDate().isBefore(
                        employee.getDateOfBirth()
                )) {

            throw new RuntimeException(
                    "Join date cannot be before date of birth"
            );
        }

        // Duplicate employee code validation
        if (employeeRepository.existsByEmployeeCode(
                employee.getEmployeeCode())) {

            throw new RuntimeException(
                    "Employee ID already exists: "
                            + employee.getEmployeeCode()
            );
        }

        // Duplicate email validation
        if (employeeRepository.existsByEmail(
                employee.getEmail())) {

            throw new RuntimeException(
                    "Email already exists: "
                            + employee.getEmail()
            );
        }

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(
            Long id,
            Employee updatedEmployee) {

        Employee existingEmployee = getEmployeeById(id);

        // Required field validation
        if (updatedEmployee.getEmployeeCode() == null ||
                updatedEmployee.getEmployeeCode().isBlank()) {

            throw new RuntimeException(
                    "Employee code is required"
            );
        }

        if (updatedEmployee.getName() == null ||
                updatedEmployee.getName().isBlank()) {

            throw new RuntimeException(
                    "Employee name is required"
            );
        }

        if (updatedEmployee.getEmail() == null ||
                updatedEmployee.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Employee email is required"
            );
        }

        // Phone number validation
        if (updatedEmployee.getPhone() != null &&
                !updatedEmployee.getPhone().isBlank()) {

            if (!updatedEmployee.getPhone().matches("\\d{10}")) {

                throw new RuntimeException(
                        "Phone number must contain exactly 10 digits"
                );
            }
        }

        // Date validation
        if (updatedEmployee.getJoinDate() != null &&
                updatedEmployee.getDateOfBirth() != null &&
                updatedEmployee.getJoinDate().isBefore(
                        updatedEmployee.getDateOfBirth()
                )) {

            throw new RuntimeException(
                    "Join date cannot be before date of birth"
            );
        }

        // Check employee code only if it has changed
        if (!existingEmployee.getEmployeeCode()
                .equals(updatedEmployee.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(
                updatedEmployee.getEmployeeCode())) {

            throw new RuntimeException(
                    "Employee ID already exists: "
                            + updatedEmployee.getEmployeeCode()
            );
        }

        // Check email only if it has changed
        if (!existingEmployee.getEmail()
                .equals(updatedEmployee.getEmail())
                && employeeRepository.existsByEmail(
                updatedEmployee.getEmail())) {

            throw new RuntimeException(
                    "Email already exists: "
                            + updatedEmployee.getEmail()
            );
        }

        existingEmployee.setEmployeeCode(
                updatedEmployee.getEmployeeCode()
        );

        existingEmployee.setName(
                updatedEmployee.getName()
        );

        existingEmployee.setEmail(
                updatedEmployee.getEmail()
        );

        existingEmployee.setPhone(
                updatedEmployee.getPhone()
        );

        existingEmployee.setDepartment(
                updatedEmployee.getDepartment()
        );

        existingEmployee.setPosition(
                updatedEmployee.getPosition()
        );

        // Department relationship
        existingEmployee.setDepartmentEntity(
                updatedEmployee.getDepartmentEntity()
        );

        // Role relationship
        existingEmployee.setRole(
                updatedEmployee.getRole()
        );

        existingEmployee.setDateOfBirth(
                updatedEmployee.getDateOfBirth()
        );

        existingEmployee.setJoinDate(
                updatedEmployee.getJoinDate()
        );

        existingEmployee.setAddress(
                updatedEmployee.getAddress()
        );

        existingEmployee.setStatus(
                updatedEmployee.getStatus()
        );

        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException(
                    "Employee not found with id: " + id
            );
        }

        employeeRepository.deleteById(id);
    }
}