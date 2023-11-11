import React from 'react';

const PharmacistRequestDetails = ({ pharmacistRequest }) => {
    const handleAccept = async () => {
        try {
            const response = await fetch('/api/pharmacistRequest/acceptRequest/'+pharmacistRequest._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Pharmacist request accepted successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error accepting pharmacist request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/pharmacistRequest/rejectRequest/${pharmacistRequest._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Pharmacist request rejected successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error rejecting pharmacist request:', error);
        }
    };
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
                <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default PharmacistRequestDetails;
