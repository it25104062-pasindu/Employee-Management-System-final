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

        if (departmentRepository.existsByName(department.getName())) {
            throw new RuntimeException(
                    "Department already exists: " + department.getName()
            );
        }

        if (department.getStatus() == null ||
                department.getStatus().isBlank()) {
            department.setStatus("Active");
        }

        return departmentRepository.save(department);
    }

    public Department updateDepartment(
            Long id,
            Department updatedDepartment) {

        Department existingDepartment = getDepartmentById(id);

        existingDepartment.setName(updatedDepartment.getName());
        existingDepartment.setDescription(
                updatedDepartment.getDescription()
        );
        existingDepartment.setStatus(
                updatedDepartment.getStatus()
        );

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