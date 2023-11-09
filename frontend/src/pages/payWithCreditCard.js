import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CreditCardPaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error(error);
        // Handle validation errors and show them to the user
      } else if (token) {
        try {
          const response = await axios.post('/api/patient/payWithCreditCard', {
            amount: amount * 100, // Amount in cents
            currency: 'EGP',
            token: token.id,
          });

          if (response.data.success) {
            // Payment succeeded
            alert('Payment successful!');
          } else {
            // Payment failed
            alert('Payment failed. Please try again.');
          }
        } catch (error) {
          console.error(error);
          // Handle network errors or other issues
          alert('Payment failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error(error.message);
      alert('Payment failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount (EGP):
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <div style={{ marginTop: '20px' }}>
        <label>
          Card details
          <CardElement options={{ style: { fontSize: '18px' } }} />
        </label>
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default CreditCardPaymentForm;
