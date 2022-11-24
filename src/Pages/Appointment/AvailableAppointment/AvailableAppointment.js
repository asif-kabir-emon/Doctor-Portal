import React, { useState } from "react";
import { format } from "date-fns";
import AppiontmentOption from "../AppiontmentOption/AppiontmentOption";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AvailableAppointment = ({ selectedDate }) => {
  const date = format(selectedDate, "PP");
  const [treatment, setTreatment] = useState(null);

  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-psi.vercel.app/v2/appointmentOptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section>
      <p className="text-2xl text-primary text-center mt-5 mb-20">
        Available Appointments on {date}
      </p>
      <div className="grid lg:grid-cols-3 gap-4 my-10">
        {appointmentOptions.map((option) => (
          <AppiontmentOption
            key={option._id}
            AppiontmentOption={option}
            setTreatment={setTreatment}
          ></AppiontmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          date={date}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
