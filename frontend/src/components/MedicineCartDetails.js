import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";

const MedicineCartDetails = ({medicine}) => {
    const handleRemove = async () => {
        try {
            const response = await fetch(`/api/medicine/removeMedicineFromCart/${medicine.name}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Error removing from cart');
            }
            const updatedMedicine = await response.json();
            alert("Medicine removed from cart")
            console.log(updatedMedicine);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={`http://localhost:8090/${medicine.imageUpload}`} alt={medicine.name} />
                <div className="icon-overlay logo-container">
                    <Link to={`/editAmount/${medicine.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>
                    <br/>
                </div>
            </div>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>
            <p>{medicine.description}</p>
            <p>Amount: {medicine.amount}</p>
            <p><button className="remove-btn" onClick={handleRemove}>Remove</button></p>
        </div>
    )
}

export default MedicineCartDetails;