import React, { useState } from 'react';
import axios from 'axios';

const AcceptRejectPharmacistRequest = ({ requestId, user }) => {
  const [status, setStatus] = useState('');

  const handleAccept = async () => {
    try {
      // Check if the user is authorized (admin) before making the request
      if (user && user.role === 'ADMIN') {
        // Send a request to the backend to update the status to 'accepted'
        await axios.put(`/api/admin/updatePharmacistRequestStatus/${requestId}`, { status: 'accepted' });
        setStatus('accepted');
      } else {
        console.error('User is not authorized to accept requests');
        // Handle unauthorized user
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      // Handle error as needed
    }
  };

  const handleReject = async () => {
    try {
      // Check if the user is authorized (admin) before making the request
      if (user && user.role === 'ADMIN') {
        // Send a request to the backend to update the status to 'rejected'
        await axios.put(`/api/updatePharmacistRequestStatus/${requestId}`, { status: 'rejected' });
        setStatus('rejected');
      } else {
        console.error('User is not authorized to reject requests');
        // Handle unauthorized user
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Update Pharmacist Request Status</h2>
      <button onClick={handleAccept} disabled={status === 'accepted'}>
        Accept
      </button>
      <button onClick={handleReject} disabled={status === 'rejected'}>
        Reject
      </button>
    </div>
  );
};

export default AcceptRejectPharmacistRequest;