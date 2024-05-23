import { FormEvent, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import "./ForeignCardForm.module.scss";
import { Context } from "../../../main";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const elementStyles = {
  base: {
    color: "#424770",
    fontWeight: 600,
    fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":focus": {
      color: "#424770",
    },
    "::placeholder": {
      color: "#9BACC8",
    },
    ":focus::placeholder": {
      color: "#CFD7DF",
    },
  },
  invalid: {
    color: "#e14b4b",
    ":focus": {
      color: "#FA755A",
    },
    "::placeholder": {
      color: "#FFCCA5",
    },
  },
};

const elementClasses = {
  focus: "focus",
  empty: "empty",
  invalid: "invalid",
};

const ForeignCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { store } = useContext(Context);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.create("cardNumber", {
      style: elementStyles,
      classes: elementClasses,
    });
    cardNumberElement.mount("#example3-card-number");

    const cardExpiryElement = elements.create("cardExpiry", {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiryElement.mount("#example3-card-expiry");

    const cardCvcElement = elements.create("cardCvc", {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvcElement.mount("#example3-card-cvc");

    return () => {
      cardNumberElement.destroy();
      cardExpiryElement.destroy();
      cardCvcElement.destroy();
    };
  }, [stripe, elements]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet!");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (cardNumberElement) {
      const { error, paymentMethod } = await stripe.
      
      createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log("PaymentMethod:", paymentMethod);
        // sendPaymentMethodToBackend(paymentMethod.id);

        store
          .createWorldCard(paymentMethod.id)
          .then((response) => console.log("Server response", response))
          .catch((error) => console.error("Error fetching data", error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} name="addCardForm">
      <div>
        <div id="example3-card-number"></div>
        <div id="example3-card-expiry"></div>
        <div id="example3-card-cvc"></div>
      </div>
      <button type="submit" disabled={!stripe} className="btn-add-card">
        Add Card
      </button>
    </form>
  );
};

const AddCardFormWithStripe = () => (
  <Elements stripe={stripePromise}>
    <ForeignCardForm />
  </Elements>
);

export default AddCardFormWithStripe;
