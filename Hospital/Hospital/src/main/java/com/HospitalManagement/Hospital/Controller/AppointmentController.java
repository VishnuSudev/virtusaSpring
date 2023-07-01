package com.HospitalManagement.Hospital.Controller;

import com.HospitalManagement.Hospital.Entity.Appointment;
import com.HospitalManagement.Hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/addAppointment")
    public Appointment saveAppointment(@RequestBody Appointment appointment){
        return appointmentService.saveAppointment(appointment);
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/getAppointments")
    public List<Appointment> getAppointments(){
        return appointmentService.getAppointments();
    }
    @CrossOrigin(origins="http://localhost:3000")
    @DeleteMapping("/deleteAppointment/{id}")
    public void delAppointment(@PathVariable("id") int id){
         appointmentService.delAppointment(id);
    }

}
