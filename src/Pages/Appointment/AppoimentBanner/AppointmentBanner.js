import React from "react";
import bg from "../../../Assets/images/bg.png";
import chairImage from "../../../Assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const css = `
  .my-today { 
    font-weight: bold;
    color: red;
    font-size: 120%; 
  }
`;

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <div style={{ background: `url(${bg})` }}>
      <div className="hero py-20">
        <div className="hero-content flex-col-reverse lg:flex-row bg-gray-100/[.01]">
          <div className="lg:w-1/2">
            <style>{css}</style>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              modifiersClassNames={{
                today: "my-today",
              }}
            ></DayPicker>
          </div>
          <img src={chairImage} className="lg:w-1/2 rounded shadow-xl" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
