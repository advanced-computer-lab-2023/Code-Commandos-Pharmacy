import React from 'react';
import {useNavigate} from "react-router-dom";

const PrescriptionDetails = ({ prescription }) => {
    const navigate = useNavigate()


    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fontBig">Prescription for {prescription.patientName}</h5>
          <p className="card-text fontMed">Doctor: {prescription.doctorName}</p>
          <p className="card-text fontMed">Status: {prescription.status}</p>
            <br/>
            <h5>Medicines</h5>
            {prescription.medicines.map((medicine, index) => (
                <div key={index} className="fontMed">
                    {medicine.name} - Dosage : {medicine.dosage}
                    <br/>
                </div>
            ))}
        </div>
      </div>
    );
};

export default PrescriptionDetails;
