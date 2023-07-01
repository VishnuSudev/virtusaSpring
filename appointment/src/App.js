import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentList from './components/AppointmentList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="card-list">
          <li className="card">
              <Link to="/">
                <div className="card-content">
                  <h3>Back</h3>
                </div>
              </Link>
            </li>
            <li className="card">
              <Link to="/appointment-booking">
                <div className="card-content">
                  <h3>Appointment Booking</h3>
                </div>
              </Link>
            </li>
            <li className="card">
              <Link to="/appointment-list">
                <div className="card-content">
                  <h3>Appointment List</h3>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/appointment-list" element={<AppointmentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
