import React from 'react';

const PharmacistDetails = ({ pharmacist }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{pharmacist.name}</h5>
                <p className="card-text">Username: {pharmacist.username}</p>
                <p className="card-text">Email: {pharmacist.email}</p>
                <p className="card-text">Date of Birth: {pharmacist.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${pharmacist.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {pharmacist.affiliation}</p>
                <p className="card-text">Educational Background: {pharmacist.educationalBackground}</p>
            </div>
        </div>
    );
};

export default PharmacistDetails;
