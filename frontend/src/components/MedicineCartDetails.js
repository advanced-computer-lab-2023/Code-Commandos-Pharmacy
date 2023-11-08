import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";

const MedicineCartDetails = ({medicine}) => {
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
        </div>
    )
}

export default MedicineCartDetails;