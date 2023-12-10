import React from 'react';

const OrderInfo = ({id, status, numberOfItems, totalPrice, paymentOption}) => {
    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`/api/order/cancelOrder/${id}`,
                {
                    method: 'PUT'
                });
            if (!response.ok) {
                throw new Error('Error cancelling your order.');
            }
            const updatedOrder = await response.json();
            alert("Order cancelled successfully")
            window.location.reload()
            console.log(updatedOrder)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <body>
        <div className="card mb-4">
            <div className="card-body">
                <p className="card-text">Number of Items: {numberOfItems}</p>
                <p className="card-text">Total Price: {totalPrice}</p>
                <p className="card-text">Payment: {paymentOption}</p>
                <p className="card-text">Status: {status}</p>

                <p>
                    <button className="remove-btn" onClick={handleCancelOrder}>Cancel</button>
                </p>
            </div>
        </div>
        </body>

    );
};
export default OrderInfo