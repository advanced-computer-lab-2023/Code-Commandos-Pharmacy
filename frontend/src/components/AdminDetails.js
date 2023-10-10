import React from 'react';

const AdminDetails = ({ admin }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Username: {admin.username}</h5>
            </div>
        </div>
    );
};

export default AdminDetails;