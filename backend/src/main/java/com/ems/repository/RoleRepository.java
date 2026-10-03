package com.ems.repository;

import com.ems.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    boolean existsByName(String name);

    List<Role> findByDepartment_Id(Long departmentId);

    List<Role> findByStatus(String status);
}