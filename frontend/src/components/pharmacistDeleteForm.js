import React, { useState } from 'react';

function PharmacistDeleteForm() {
  const [pharmacistId, setPharmacistId] = useState('');

    const handlePharmacistIdChange = (event) => {
      setPharmacistId(event.target.value);
    };

    const handleDelete = () => {
       fetch('http://localhost/4000/api/pharmacistRoute/removePharmacist/:id', {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('An error occurred while deleting the pharmacist.');
        }
      })
      .then(() => {
        alert('Pharmacist deleted successfully.');
        setPharmacistId('');
      })
      .catch(error => {
        console.error('An error occurred:', error);
        alert(error.message);
      });
    };

    return (
      <div>
        <h1>Delete Pharmacist</h1>
        <label htmlFor="pharmacist-id">Pharmacist ID:</label>
        <input
          type="text"
          id="pharmacist-id"
          placeholder="Enter Pharmacist ID"
          value={pharmacistId}
          onChange={handlePharmacistIdChange}
        /><br />
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }

export default PharmacistDeleteForm;