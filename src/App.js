
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import PaymentDetails from './components/PaymentDetails';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
    <PaymentDetails />
  </Elements>
);

export default App;
