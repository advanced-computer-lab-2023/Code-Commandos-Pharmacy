import React from 'react';

const MedicineInfo = ({ name, quantity, sales }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Quantity: {quantity} available</p>
                <p className="card-text">Sales: {sales}</p>
            </div>
        </div>
    );
};

export default MedicineInfo;
