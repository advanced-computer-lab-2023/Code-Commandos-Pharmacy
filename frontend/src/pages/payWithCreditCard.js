import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CreditCardForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();

    const { stripe } = this.props;
    const { token } = await stripe.createToken({ name: 'Name' });

    try {
      const response = await axios.post('/api/payment', {
        amount: 1000, // Amount in cents
        currency: 'EGP', // Currency code (USD in this case)
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
      // Network error or other issues
      alert('Payment failed. Please try again later.');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement style={{ base: { fontSize: '18px' } }} />
        </label>
        <button type="submit">Pay</button>
      </form>
    );
  }
}

export default injectStripe(CreditCardForm);
