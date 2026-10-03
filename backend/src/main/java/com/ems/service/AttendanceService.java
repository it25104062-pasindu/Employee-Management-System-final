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
        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(
            Long id,
            Attendance updatedAttendance) {
        Attendance existingAttendance = getAttendanceById(id);

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
}