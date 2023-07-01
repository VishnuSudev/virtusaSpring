import React, { useEffect, useState } from 'react';
import AppointmentList from './AppointmentList';
import ConfirmationModal from './ConfirmationModal';
import "./main.css"
import axios from 'axios';


const HospitalBookingSystem = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState('');
  const [appointmentDescription, setAppointmentDescription] = useState('');
  const [idCounter, setIdCounter] = useState(1);
  const [appointmentSlots] = useState([
    '10:00am - 11:00am', '11:00am - 12:00pm', '12:00pm - 1:00pm',
    '02:00pm - 03:00pm', '03:00pm - 04:00pm'
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [appointments1, setAppointments1] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAppointments');
        setAppointments1(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []);
  

  const renderAppointmentTimeSlots = () => {
    const currentDate = getCurrentDate();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return appointmentSlots.map((slot) => {
      const startTime = slot.split(' - ')[0];
      const slotDate = appointmentDate || currentDate;
      const isDisabled = slotDate === currentDate && currentTime > startTime;
  
      return (
        <option key={slot} value={slot} disabled={isDisabled}>
          {slot}
        </option>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isSlotAlreadyBooked = appointments1.some(
      (appointment) =>
        appointment.doctorName === doctorName &&
        appointment.appointmentDate === appointmentDate &&
        appointment.appointmentTime === appointmentTime
    );
  
    if (isSlotAlreadyBooked) {
      setErrorMessage('Appointment slot is already booked. Please select a different date and time');
      setShowErrorMessage(true);
      return;
    }

    const newAppointment = {
      id : idCounter,
      id1: Date.now(),
      patientName,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentDuration,
      appointmentDescription,
    };

    const payload ={
      patientName:patientName,
      doctorName:doctorName,
      appointmentDate:appointmentDate,
      appointmentTime:appointmentTime,
      appointmentDuration:appointmentDuration,
      appointmentDescription:appointmentDescription,
    }
    axios.post('http://localhost:8080/addAppointment', payload)
      .then(response => {
        console.log('Success:');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setAppointments([...appointments, newAppointment]);
    setShowSuccessMessage(true);
    setIdCounter(idCounter + 1);
    //alert('Appointment booked successfully!');
    resetForm();
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };
  
  const handleEdit = (id) => {
    const appointmentToEdit = appointments.find((appointment) => appointment.id === id);
    if (appointmentToEdit) {
      setPatientName(appointmentToEdit.patientName);
      setDoctorName(appointmentToEdit.doctorName);
      setAppointmentDate(appointmentToEdit.appointmentDate);
      setAppointmentTime(appointmentToEdit.appointmentTime);
      setAppointmentDuration(appointmentToEdit.appointmentDuration);
      setAppointmentDescription(appointmentToEdit.appointmentDescription);
      deleteAppointment(id);
    }
  };

  const SuccessMessage = () => {
    return (
      <div className="success-message" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="tick">&#10004;</span>
        <p style={{ color: 'white', fontWeight: 'bold' }}>Appointment booked successfully!</p>
      </div>
    );
  };
  

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDelete = (id) => {
    const appointmentToDelete = appointments.find((appointment) => appointment.id === id);
    setAppointmentToDelete(appointmentToDelete);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      deleteAppointment(appointmentToDelete.id);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  const resetForm = () => {
    setPatientName('');
    setDoctorName('');
    setAppointmentDate('');
    setAppointmentTime('');
    setAppointmentDuration('');
    setAppointmentDescription('');
  };

  return (
    <div className="container">
      <h1>Appointment Booking</h1>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="patientName">
      <b>Patient Name</b>
    </label>
    <input
      type="text"
      className="form-control"
      id="patientName"
      value={patientName}
      onChange={(e) => setPatientName(e.target.value)}
      required
      placeholder="Enter the Patient Name"
    />
  </div>

  <div className="form-group">
    <label htmlFor="doctorName">
      <b>Doctor Name</b>
    </label>
    <select
      className="form-control"
      id="doctorName"
      value={doctorName}
      onChange={(e) => setDoctorName(e.target.value)}
      required
    >
      <option value="">Select Doctor</option>
      <option value="Dr. John Doe">Dr. John Doe</option>
      <option value="Dr. Jane Smith">Dr. Jane Smith</option>
      <option value="Dr. Mike Johnson">Dr. Mike Johnson</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="appointmentDate">
      <b>Date</b>
    </label>
    <input
      type="date"
      className="form-control"
      id="appointmentDate"
      value={appointmentDate}
      onChange={(e) => setAppointmentDate(e.target.value)}
      required
      min={getCurrentDate()}
    />
  </div>

  <div className="form-group">
    <label htmlFor="appointmentTime">
      <b>Time</b>
    </label>
    <select
      className="form-control"
      id="appointmentTime"
      value={appointmentTime}
      onChange={(e) => setAppointmentTime(e.target.value)}
      required
      >
      <option value="">Select Time Slot</option>
  {renderAppointmentTimeSlots()}
  </select>
  </div>

  <div className="form-group">
    <label htmlFor="appointmentDuration">
      <b>Duration</b>
    </label>
    <select
      className="form-control"
      id="appointmentDuration"
      value={appointmentDuration}
      onChange={(e) => setAppointmentDuration(e.target.value)}
      required
    >
      <option value="">Select Duration</option>
      <option value="15 Minutes">15 Minutes</option>
      <option value="30 Minutes">30 Minutes</option>
      <option value="1 Hour">1 Hour</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="appointmentDescription">
      <b>Description</b>
    </label>
    <textarea
      id="appointmentDescription"
      value={appointmentDescription}
      required
      onChange={(e) => setAppointmentDescription(e.target.value)}
    ></textarea>
  </div>

  <button type="submit" className="btn btn-primary">
    Book Appointment
  </button>
</form>

      {showSuccessMessage && <SuccessMessage />}

      {showErrorMessage && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <div
            className="error-message"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p>{errorMessage}</p>
            <button className="btn btn-primary" onClick={() => setShowErrorMessage(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      

    </div>
  );
};

export default HospitalBookingSystem;