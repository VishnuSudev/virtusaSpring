package com.HospitalManagement.Hospital.repository;

import com.HospitalManagement.Hospital.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
