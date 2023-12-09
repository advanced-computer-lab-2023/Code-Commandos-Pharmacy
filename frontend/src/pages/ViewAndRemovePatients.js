import React, { useState, useEffect } from "react";
import PatientDetails from "../components/PatientDetails";

const ViewAndRemovePatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('api/patient/getPatients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const results = await response.json();
        setPatients(results);
        console.log(patients);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      setSelectedPatient(null);
    }
  };

  const handleRemovePatient = async (patientId) => {
    try {
      const response = await fetch(`/api/patient/deletePatient/${patientId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchResults();
        setSelectedPatient(null);
        setSelectedAddress(null); // Clear selected address when removing patient
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="container mt-4">
      <div className="row">
        <div className="col-6">
          <h1 className="mb-4">System patients</h1>
          <ul className="list-group width-adjust">
            {patients.map((patient) => (
                <li key={patient._id} className="list-group-item">
                  <button
                      className="btn btn-link btn-lg"
                      onClick={() => setSelectedPatient(patient)}
                      style={{ textDecoration: "none" }}
                  >
                    {patient.name}
                  </button>
                </li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          <img className="" src={require(`../images/patient.gif`)} alt="Pharmacy"/>
        </div>
      </div>


      {selectedPatient && (
        <>
          <PatientDetails patient={selectedPatient} />
          <select
            className="form-select mt-3"
            onChange={(e) => setSelectedAddress(e.target.value)}
            value={selectedAddress || ""}
          >
            <option value="">Select Address</option>
            {selectedPatient.addresses.map((address, index) => (
              <option key={index} value={address.street + ', ' + address.city + ', ' + address.country}>
                {address.street}, {address.city}, {address.country}
              </option>
            ))}
          </select>
          <button className="btn btn-danger mt-3" onClick={() => handleRemovePatient(selectedPatient._id)}>Remove</button>
        </>
      )}
    </div>
  );
};

export default ViewAndRemovePatients;
