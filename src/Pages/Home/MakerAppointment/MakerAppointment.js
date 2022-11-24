import React from "react";
import { Link } from "react-router-dom";
import doctorImage from "../../../Assets/images/doctor.png";
import appointmentImage from "../../../Assets/images/appointment.png";
import PrimaryButton from "../../../Components/PrimaryButton";

const MakerAppointment = () => {
  return (
    <section
      className="mt-40"
      style={{ background: `url(${appointmentImage})` }}
    >
      <div>
        <div className="flex flex-col lg:flex-row items-center">
          <img
            src={doctorImage}
            className="lg:w-1/2 -mt-36 hidden lg:block rounded-lg"
            alt="doctor"
          />
          <div className="p-6">
            <h4 className="text-xl text-primary font-bold">Appointment</h4>
            <h2 className="text-4xl font-bold">Make an appointment Today</h2>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <Link to="/appointment">
              <div>
                <PrimaryButton>Book an Appointment</PrimaryButton>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakerAppointment;
