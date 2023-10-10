import React from 'react';

const PharmacistRequestDetails = ({ pharmacistRequest }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{pharmacistRequest.name}</h5>
                <p className="card-text">Username: {pharmacistRequest.username}</p>
                <p className="card-text">Email: {pharmacistRequest.email}</p>
                <p className="card-text">Date of Birth: {pharmacistRequest.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${pharmacistRequest.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {pharmacistRequest.affiliation}</p>
                <p className="card-text">Educational Background: {pharmacistRequest.educationalBackground}</p>
                <p className="card-text">Status: {pharmacistRequest.status}</p>
            </div>
        </div>
    );
};

export default PharmacistRequestDetails;
