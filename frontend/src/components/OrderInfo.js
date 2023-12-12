import React from 'react';
import Swal from "sweetalert2";

const OrderInfo = ({id, status, numberOfItems, totalPrice, paymentOption}) => {
    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`/api/order/cancelOrder/${id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                if (errorResponse.message === 'Cannot cancel a delivered order.') {
                    throw new Error('Cannot cancel a delivered order.');
                } else {
                    throw new Error('Error cancelling your order.');
                }
            }

            const updatedOrder = await response.json();

            Swal.fire({
                icon: 'success',
                title: 'Order cancelled successfully',
            });

            window.location.reload();
            console.log(updatedOrder);
        } catch (error) {
            console.error(error);

            if (error.message === 'Cannot cancel a delivered order.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot cancel order',
                    text: 'This order has already been delivered and cannot be cancelled.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error cancelling order',
                    text: error.message,
                });
            }
        }
    };
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