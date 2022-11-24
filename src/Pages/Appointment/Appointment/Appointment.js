import React, { useState } from "react";
import AppointmentBanner from "../AppoimentBanner/AppointmentBanner";
import AvailableAppointment from "../AvailableAppointment/AvailableAppointment";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="mx-5">
      <AppointmentBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></AppointmentBanner>
      <AvailableAppointment selectedDate={selectedDate}></AvailableAppointment>
    </div>
  );
};

export default Appointment;
