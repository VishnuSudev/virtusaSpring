import React, { useEffect, useState } from 'react';
import "./main.css"
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState(null);
  const [delid, setDelid] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    setDelid(id)
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
    const response = await axios.delete(`http://localhost:8080/deleteAppointment/${delid}`);
    
    } catch (error) {
      console.error('Error:', error);
    }
    console.log("deleted");
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAppointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []);
  return (
    <div>
      <h2>Appointment List</h2>
      {/* <h2>{appointments.length>0? appointments[0].patientName:"hii"}</h2> */}
      {appointments && appointments.length ? (
        <table className="table">
          <thead>
            <tr>
            <th>ID</th> {/* Add ID column */}
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
              <td>{appointment.id}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.appointmentDuration}</td>
                <td>{appointment.appointmentDescription}</td>
                <td>
                  {/* <button className="btn btn-secondary" onClick={() => handleEdit(appointment.id)}>
                    Edit
                  </button> */}
                  <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments booked.</p>
      )}
       <div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete?</p>
            <div className="modal-actions">
              <button onClick={handleConfirm}>OK</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default AppointmentList;