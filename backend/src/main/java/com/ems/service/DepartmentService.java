package com.ems.service;

import com.ems.entity.Department;
import com.ems.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with id: " + id
                        )
                );
    }

    public Department createDepartment(Department department) {

        // Department name is required
        if (department.getName() == null ||
                department.getName().isBlank()) {

            throw new RuntimeException(
                    "Department name is required"
            );
        }

        String departmentName = department.getName().trim();

        // Duplicate department name validation
        if (departmentRepository.existsByName(departmentName)) {
            throw new RuntimeException(
                    "Department already exists: " + departmentName
            );
        }

        department.setName(departmentName);

        // Default status
        if (department.getStatus() == null ||
                department.getStatus().isBlank()) {

            department.setStatus("Active");
        } else {
            department.setStatus(
                    department.getStatus().trim()
            );
        }

        return departmentRepository.save(department);
    }

    public Department updateDepartment(
            Long id,
            Department updatedDepartment) {

        Department existingDepartment = getDepartmentById(id);

        // Department name is required
        if (updatedDepartment.getName() == null ||
                updatedDepartment.getName().isBlank()) {

            throw new RuntimeException(
                    "Department name is required"
            );
        }

        String newDepartmentName =
                updatedDepartment.getName().trim();

        // Check duplicate name only if the name has changed
        if (!existingDepartment.getName()
                .equalsIgnoreCase(newDepartmentName)
                && departmentRepository.existsByName(
                newDepartmentName)) {

            throw new RuntimeException(
                    "Department already exists: "
                            + newDepartmentName
            );
        }

        existingDepartment.setName(
                newDepartmentName
        );

        existingDepartment.setDescription(
                updatedDepartment.getDescription()
        );

        // Default status when blank
        if (updatedDepartment.getStatus() == null ||
                updatedDepartment.getStatus().isBlank()) {

            existingDepartment.setStatus("Active");

        } else {

            existingDepartment.setStatus(
                    updatedDepartment.getStatus().trim()
            );
        }

        return departmentRepository.save(existingDepartment);
    }

    public void deleteDepartment(Long id) {

        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException(
                    "Department not found with id: " + id
            );
        }

        departmentRepository.deleteById(id);
    }
}