package com.HospitalManagement.Hospital.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String patientName;
    private String doctorName;
    private String appointmentDate;

    public Appointment(int id, String patientName, String doctorName, String appointmentDate, String appointmentTime, String appointmentDuration, String appointmentDescription) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.appointmentDuration = appointmentDuration;
        this.appointmentDescription = appointmentDescription;
    }

    public int getId() {
        return id;
    }

    public Appointment() {
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", patientName='" + patientName + '\'' +
                ", doctorName='" + doctorName + '\'' +
                ", appointmentDate='" + appointmentDate + '\'' +
                ", appointmentTime='" + appointmentTime + '\'' +
                ", appointmentDuration='" + appointmentDuration + '\'' +
                ", appointmentDescription='" + appointmentDescription + '\'' +
                '}';
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getAppointmentDuration() {
        return appointmentDuration;
    }

    public void setAppointmentDuration(String appointmentDuration) {
        this.appointmentDuration = appointmentDuration;
    }

    public String getAppointmentDescription() {
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }

    private String appointmentTime;
    private String appointmentDuration;
    private String appointmentDescription;





}
