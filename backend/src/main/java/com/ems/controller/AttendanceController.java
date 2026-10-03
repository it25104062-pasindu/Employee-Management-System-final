package com.ems.controller;

import com.ems.entity.Attendance;
import com.ems.service.AttendanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5176"
})
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(
                attendanceService.getAllAttendance());
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(
            @PathVariable String date) {
        LocalDate attendanceDate = LocalDate.parse(date);

        return ResponseEntity.ok(
                attendanceService.getAttendanceByDate(attendanceDate));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployee(
            @PathVariable Long employeeId) {
        return ResponseEntity.ok(
                attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id));
    }

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(
            @RequestBody Attendance attendance) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(attendanceService.createAttendance(attendance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {
        return ResponseEntity.ok(
                attendanceService.updateAttendance(id, attendance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(
            @PathVariable Long id) {
        attendanceService.deleteAttendance(id);

        return ResponseEntity.noContent().build();
    }
}