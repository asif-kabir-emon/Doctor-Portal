import React from "react";

const AppiontmentOption = ({ AppiontmentOption, setTreatment }) => {
  const { name, slots, price } = AppiontmentOption;
  return (
    <div>
      <div className="card shadow-lg">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-primary mx-auto">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try another day"}</p>
          <p>
            {slots.length} {slots.length > 1 ? "spaces" : "space"} available
          </p>
          <p>Price: ${price}</p>
          <div className="card-actions justify-center">
            <label
              disabled={slots.length === 0}
              onClick={() => setTreatment(AppiontmentOption)}
              htmlFor="booking-modal"
              className="btn btn-primary px-4 bg-gradient-to-r from-primary to-secondary text-white"
            >
              Book Appointment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppiontmentOption;
