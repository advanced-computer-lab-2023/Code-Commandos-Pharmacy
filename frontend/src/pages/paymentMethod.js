import React, { useState } from 'react';

const PaymentMethod = () => {
  const [payment, setPayment] = useState('credit_card');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    // ... your payment logic ...
    if (payment === 'credit_card') {
      return '/payWithcreditCard';
    } else if (payment === 'wallet') {
      return '/ViewMyWallet';
    } else if (payment === 'cash_on_delivery') {
      return '/checkout';
    }

    // If no valid payment method is selected, you can return a default path or handle it as needed.
    setMessage('Payment failed');
    return '/';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPath = await handlePayment();
    // Navigate to the selected path
    window.location.href = newPath;
  };
  
    return (
      <div className="payment-form">
      <h2 className="title-form">Payment Method: </h2>
      <form onSubmit={handleSubmit}>
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
  
  