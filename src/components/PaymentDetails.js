
import React, { useState } from 'react';

const PaymentDetails = () => {
  const [paymentId, setPaymentId] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`https://stripe-backend-ufpm.onrender.com/api/payment/${paymentId}`);
      
      if (!response.ok) {
        throw new Error('Payment not found');
      }

      const data = await response.json();
      setPaymentData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
      <h2 className="text-xl font-bold mb-4">Fetch Payment Details</h2>
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={fetchPaymentDetails}
        className="mt-2 w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
      >
        Get Payment Details
      </button>

      {error && <div className="mt-2 text-red-500">{error}</div>}
      {paymentData && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="font-bold">Payment Details:</h3>
          <pre>{JSON.stringify(paymentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
