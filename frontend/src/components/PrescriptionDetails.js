import React from 'react';
import {useNavigate} from "react-router-dom";

const PrescriptionDetails = ({ prescription }) => {
    const navigate = useNavigate()


    const handleAddToCart = async (name) => {
        try {
            const response = await fetch(`/api/cart/addToCart/${name}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to add medicine to cart');
            }
            const updatedCart = await response.json();
            alert("Medicine Added to Cart Successfully!")
        } catch (error) {
            alert(error.message)
        }
    };

    const handleAddAllToCart = async () =>{
        try {
            const response = await fetch('/api/cart/addAllPrescriptionMedicinesToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescription.medicines)
            });
            if (!response.ok) {
                throw new Error('Failed to add medicines to cart');
            }
            alert("All medicines are added to cart successfully!")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fontBig">Prescription for {prescription.patientName}</h5>
          <p className="card-text fontMed">Doctor: {prescription.doctorName}</p>
          <p className="card-text fontMed">Status: {prescription.status}</p>
            <br/>
            <h5>Medicines</h5>
            {prescription && prescription.medicines.map((medicine, index) => (
                <div key={index} className="fontMed">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(medicine.name)}
                    >
                        Add to Cart
                    </button>
                    &nbsp;
                    {medicine.name}
                    <br/>
                    Dosage: {medicine.dosage}
                    <br/>
                    Dosage description : {medicine.dosageDescription}
                    <br/>
                    <br/>
                </div>

            ))}
            <button
                className="btn btn-primary btn-sm"
                onClick={() => handleAddAllToCart()}
            >
                Add All medicines to Cart
            </button>
        </div>
      </div>
    );
};

export default PrescriptionDetails;
