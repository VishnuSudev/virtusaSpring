package com.HospitalManagement.Hospital.service;

import com.HospitalManagement.Hospital.Entity.Appointment;
import com.HospitalManagement.Hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    public void delAppointment(int id) {
        appointmentRepository.deleteById(id);
    }
}
