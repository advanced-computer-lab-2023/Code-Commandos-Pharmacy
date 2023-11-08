import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import {Link} from "react-router-dom";
const PatientDetails = ({ patient }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{patient.name}</h5>
                <p className="card-text">Username: {patient.username}</p>
                <p className="card-text">Email: {patient.email}</p>
                <p className="card-text">Date of Birth: {patient.dateOfBirth}</p>
                <p className="card-text">Gender: {patient.gender}</p>
                <p className="card-text">Mobile Number: {patient.mobileNumber}</p>
                <h5 className="card-title">Addresses</h5>
                {patient.addresses.map((address, index) => (
                <li key={index} className="list-group-item">
                    <p className="mb-0">Street: {address.street}</p>
                    <p className="mb-0">City: {address.city}</p>
                    <p className="mb-0">Country: {address.country }</p>
                </li>
                 ))}

                <p className="card-text">Emergency Contact: {patient.emergencyContact.fullName}</p>
                <p className="card-text">Relation to Patient: {patient.emergencyContact.relationToPatient}</p>
                <div className="icon-overlay logo-container">
                    <Link to={`/editPatient/${patient.name}`}>
                        <img className="edit-logo" src={require(`../images/edit.png`)} alt="Edit"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
