import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "./StripePayment";

import { useStripe, useElements } from '@stripe/react-stripe-js';

import { PaymentElement } from "@stripe/react-stripe-js";

function StripeFormNewCard(): JSX.Element {
return <>

  <PaymentElement/>
  

</>
}

export default StripeFormNewCard;
