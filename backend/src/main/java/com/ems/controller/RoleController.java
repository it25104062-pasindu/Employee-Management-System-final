package com.ems.controller;

import com.ems.entity.Role;
import com.ems.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5176"})
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(
                roleService.getAllRoles()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                roleService.getRoleById(id)
        );
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<Role>> getRolesByDepartment(
            @PathVariable Long departmentId) {

        return ResponseEntity.ok(
                roleService.getRolesByDepartment(departmentId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Role>> getRolesByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                roleService.getRolesByStatus(status)
        );
    }

    @PostMapping
    public ResponseEntity<Role> createRole(
            @RequestBody Role role) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(roleService.createRole(role));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Long id,
            @RequestBody Role role) {

        return ResponseEntity.ok(
                roleService.updateRole(id, role)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(
            @PathVariable Long id) {

        roleService.deleteRole(id);

        return ResponseEntity.noContent().build();
    }
}