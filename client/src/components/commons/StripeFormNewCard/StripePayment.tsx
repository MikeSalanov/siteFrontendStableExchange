import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import {Elements} from "@stripe/react-stripe-js"
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import StripeFormNewCard from './StripeFormNewCard';
const publishibleKey =
  'pk_test_51PHoiORpkz4GnC8P7BKErbN83yB6OOvEPcSRImREULuQAEUdigC9ZSLZwI28rW1evJB5SGVSMeyYRZm7wgJfTZVY00sUy2bnpS';

const secretKey =
  'sk_test_51PHoiORpkz4GnC8PCaAiKPP7wy4QwX8N8Mdu62c3pwyFUBfIsYNZSpKVolDqKw96tUv88y8EDnDZYCLFspEwgjax00LQ1t7po1';



const StripePayment = () => {
  const [stripePromise, setStripePromise] = useState<unknown>(null);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(()=>{
  setStripePromise(loadStripe(publishibleKey))
  },[])

  return <>
  <Elements stripe = {stripePromise} options = {{secretKey}}>
  <StripeFormNewCard/>
  </Elements>
  </>;
};

export default StripePayment;
