

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [description, setDescription] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; 
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      setPaymentResponse({ error: error.message });
      return;
    }

    const response = await fetch('https://stripe-backend-ufpm.onrender.com/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: amount * 100, 
        currency, 
        payment_method_data: { 
          type: 'card',
          card: {
            token: token.id 
          }
        },
        description 
      }),
    });

    const data = await response.json();
    setPaymentResponse(data);
  };


  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <form className="p-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Details</label>
          <CardElement className="mt-1 border border-gray-300 rounded-md p-2" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
          disabled={!stripe} 
        >
          Pay
        </button>
      </form>
      {paymentResponse && (
        <div className="p-4">
          <h3 className="font-bold">Payment Response:</h3>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
