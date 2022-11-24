import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
// import { useNavigation } from "react-day-picker";
import { useLoaderData } from "react-router-dom";
// import LoadingSpinner from "../../../Components/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  //   const navigation = useNavigation();
  const booking = useLoaderData();
  const { treatment, price, slot, appointmentDate } = booking;

  //   if (navigation.state === "loading") {
  //     return <LoadingSpinner></LoadingSpinner>;
  //   }
  return (
    <div>
      <h2 className="text-3xl">Payment for {treatment}</h2>
      <p className="text-lg mt-5">
        Please pay <strong>${price}</strong> for your appointment on
        {appointmentDate} at {slot}
      </p>
      <div className="mt-10 w-96">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
