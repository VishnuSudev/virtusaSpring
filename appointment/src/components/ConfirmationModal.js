import React from 'react';
import "./main.css"

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
