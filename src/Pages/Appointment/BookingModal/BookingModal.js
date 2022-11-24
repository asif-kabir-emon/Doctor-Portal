import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const { user } = useContext(AuthContext);
  const { name, slots, price } = treatment;
  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const patient_name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const booking = {
      appointmentDate: date,
      treatment: name,
      patient: patient_name,
      slot: slot,
      phone: phone,
      email: email,
      price: price,
      paid: false,
    };
    // console.log(booking);

    fetch("https://doctors-portal-server-psi.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking Confirmed");
          refetch();
        } else {
          setTreatment(null);
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      {user?.uid ? (
        <>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="booking-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">{name}</h3>
              <form onSubmit={handleSubmit} className="grid gap-3 mt-6">
                <input
                  type="text"
                  value={date}
                  disabled
                  className="input input-bordered w-full rounded"
                />
                <select name="slot" className="select select-bordered w-full">
                  {slots.map((slot, index) => (
                    <option value={slot} key={index}>
                      {slot}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full rounded"
                />
                <input
                  type="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="input input-bordered w-full rounded"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-accent w-full"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
      )}
    </>
  );
};

export default BookingModal;
