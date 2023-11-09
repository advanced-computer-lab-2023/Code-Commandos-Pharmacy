import React from 'react';

const OrderInfo = ({ id, status, paymentOption }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">OrderID: {id}</h5>
                <p className="card-text">Status: {status}</p>
                <p className="card-text">Payment: {paymentOption}</p>
            </div>
        </div>
    );
};

export default OrderInfo;
