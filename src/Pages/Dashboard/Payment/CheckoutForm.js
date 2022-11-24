import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { _id, price, email, patient } = booking;

  useEffect(() => {
    fetch(
      `https://doctors-portal-server-psi.vercel.app/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        transactionId: paymentIntent.id,
        booking_id: _id,
        price: price,
        email: email,
      };

      fetch(`https://doctors-portal-server-psi.vercel.app/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setIsSuccess(true);
            setSuccess("Congrats! you payment completed");
            setTransactionId(paymentIntent.id);
            toast.success("payment successful");
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={isSuccess ? "hidden" : " block"}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm mt-4"
          disabled={!stripe || !clientSecret || isSuccess}
        >
          Pay
        </button>
        <p className="text-red-500 mt-6">{cardError.message}</p>
      </form>
      {success && (
        <>
          <p className="text-green-600 text-2xl mb-4">{success}</p>
          <p>
            Your Transaction ID:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
