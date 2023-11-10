import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";

const MedicineDetails = ({medicine}) => {
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`/api/cart/addToCart/${medicine._id}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Error adding to cart');
            }
            const updatedMedicine = await response.json();
            alert("Added to cart successfully!")
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
                    <Link to={`/editMedicine/${medicine.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>
                <br/>
                    <Link to={handleAddToCart()}>
                        <img className="edit-addToCart" src={require(`../images/addToCart.png`)} alt="Cart"/>
                    </Link>
                </div>
            </div>
            <p>{medicine.name}</p>
            <p>{medicine.price} EGP</p>
            <p>{medicine.description}</p>
        </div>
    )
}

export default MedicineDetails;