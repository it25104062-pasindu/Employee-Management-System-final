package com.ems.service;

import com.ems.entity.Attendance;
import com.ems.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployee_Id(employeeId);
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Attendance record not found with id: " + id));
    }

    public Attendance createAttendance(Attendance attendance) {

        validateAttendance(attendance);

        List<Attendance> existingRecords =
                attendanceRepository.findByEmployee_IdAndDate(
                        attendance.getEmployee().getId(),
                        attendance.getDate());

        if (!existingRecords.isEmpty()) {
            throw new RuntimeException(
                    "Attendance already exists for this employee on this date.");
        }

        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(
            Long id,
            Attendance updatedAttendance) {

        Attendance existingAttendance = getAttendanceById(id);

        validateAttendance(updatedAttendance);

        List<Attendance> duplicateRecords =
                attendanceRepository.findByEmployee_IdAndDate(
                        updatedAttendance.getEmployee().getId(),
                        updatedAttendance.getDate());

        boolean duplicateExists = duplicateRecords.stream()
                .anyMatch(record -> !record.getId().equals(id));

        if (duplicateExists) {
            throw new RuntimeException(
                    "Attendance already exists for this employee on this date.");
        }

        existingAttendance.setEmployee(
                updatedAttendance.getEmployee());

        existingAttendance.setDate(
                updatedAttendance.getDate());

        existingAttendance.setCheckIn(
                updatedAttendance.getCheckIn());

        existingAttendance.setCheckOut(
                updatedAttendance.getCheckOut());

        existingAttendance.setStatus(
                updatedAttendance.getStatus());

        return attendanceRepository.save(existingAttendance);
    }

    public void deleteAttendance(Long id) {

        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Attendance record not found with id: " + id);
        }

        attendanceRepository.deleteById(id);
    }

    private void validateAttendance(Attendance attendance) {

        if (attendance.getEmployee() == null
                || attendance.getEmployee().getId() == null) {
            throw new RuntimeException("Employee is required.");
        }

        if (attendance.getDate() == null) {
            throw new RuntimeException("Attendance date is required.");
        }

        if (attendance.getStatus() == null
                || attendance.getStatus().trim().isEmpty()) {
            throw new RuntimeException("Attendance status is required.");
        }

        if (attendance.getCheckIn() != null
                && attendance.getCheckOut() != null
                && attendance.getCheckOut()
                .isBefore(attendance.getCheckIn())) {
            throw new RuntimeException(
                    "Check-out time cannot be before check-in time.");
        }

        attendance.setStatus(attendance.getStatus().trim());
    }
}