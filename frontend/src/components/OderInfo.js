import React from 'react';

const OrderInfo = ({ id, status, paymentOption }) => {
    const handleCancelOrder = async () => {
        try{
            const response = await fetch(`/api/order/deleteOrder/${id}`,
                {
                    method: 'DELETE'
                });
            if(!response.ok){
                throw new Error('Error cancelling your order.');
            }
            const updatedOrder = await response.json();
            alert("Order cancelled successfully")
            console.log(updatedOrder)
        }catch (error){
            console.error(error)
        }
    }
    return (
        <body>
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">OrderID: {id}</h5>
                <p className="card-text">Status: {status}</p>
                <p className="card-text">Payment: {paymentOption}</p>
                <p><button className="remove-btn" onClick={handleCancelOrder}>Cancel</button></p>
            </div>
        </div>
        </body>

    );
};

export default OrderInfo;
