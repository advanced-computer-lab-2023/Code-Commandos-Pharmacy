import React, { useState } from 'react';
const PaymentMethod = () => {
    const [payment, setPayment] = useState('credit_card');
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState('');
  
    const handlePayment = async () => {
      try {
        const response = await fetch('/api/patient/paymentMethod', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ payment, amount }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setClientSecret(data.clientSecret);
          setMessage(data.message); // Update state with the payment method message
          // Handle the payment method message in your UI as needed
        } else {
          const errorData = await response.json();
          setMessage(errorData.error); // Update state with the error message
          // Handle the error message in your UI as needed
        }
      } catch (error) {
        console.error(error);
        setMessage('Payment failed'); // Set a generic error message in case of network error
        // Handle the error message in your UI as needed
      }
    };
  
    return (
      <div className="payment-form">
        <h2 className="title-form">Payment Method: </h2>
        <form onSubmit={handlePayment}>
          <div className="form-row row">
            <div className="col">
              <select
                className="form-control"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="wallet">Wallet</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            </div>
            <button type="submit" className="btn submit-btn">Process Payment</button>
        </form>
        <p>{message}</p>
      </div>
    );
  };
  
  export default PaymentMethod
  
  