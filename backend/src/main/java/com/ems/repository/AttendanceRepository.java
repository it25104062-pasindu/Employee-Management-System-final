package com.ems.repository;

import com.ems.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByDate(LocalDate date);

    List<Attendance> findByEmployee_Id(Long employeeId);

    List<Attendance> findByEmployee_IdAndDate(
            Long employeeId,
            LocalDate date);
}