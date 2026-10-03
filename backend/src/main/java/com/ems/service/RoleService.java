package com.ems.service;

import com.ems.entity.Role;
import com.ems.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Role not found with id: " + id
                        )
                );
    }

    public List<Role> getRolesByDepartment(Long departmentId) {
        return roleRepository.findByDepartment_Id(departmentId);
    }

    public List<Role> getRolesByStatus(String status) {
        return roleRepository.findByStatus(status);
    }

    public Role createRole(Role role) {

        if (roleRepository.existsByName(role.getName())) {
            throw new RuntimeException(
                    "Role already exists: " + role.getName()
            );
        }

        if (role.getStatus() == null ||
                role.getStatus().isBlank()) {
            role.setStatus("Active");
        }

        return roleRepository.save(role);
    }

    public Role updateRole(Long id, Role updatedRole) {

        Role existingRole = getRoleById(id);

        existingRole.setName(updatedRole.getName());
        existingRole.setDepartment(updatedRole.getDepartment());
        existingRole.setDescription(updatedRole.getDescription());
        existingRole.setStatus(updatedRole.getStatus());

        return roleRepository.save(existingRole);
    }

    public void deleteRole(Long id) {

        if (!roleRepository.existsById(id)) {
            throw new RuntimeException(
                    "Role not found with id: " + id
            );
        }

        roleRepository.deleteById(id);
    }
}