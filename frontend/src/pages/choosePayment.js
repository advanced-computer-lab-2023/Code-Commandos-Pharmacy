import React, { useState } from 'react';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/paymentMethod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod, amount }),
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
      <label>
        Payment Method:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="credit_card">Credit Card</option>
          <option value="wallet">Wallet</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <br />
      <button onClick={handlePayment}>Process Payment</button>
      <p>{message}</p>
    </div>
  );
};

export default PaymentForm;
