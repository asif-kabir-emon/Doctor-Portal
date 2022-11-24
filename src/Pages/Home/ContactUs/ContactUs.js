import React from "react";
import appointmentImage from "../../../Assets/images/appointment.png";
import PrimaryButton from "../../../Components/PrimaryButton";

const ContactUs = () => {
  return (
    <section style={{ background: `url(${appointmentImage})` }}>
      <div className="text-center py-10">
        <h4 className="text-xl font-bold text-primary">Contact Us</h4>
        <h2 className="text-4xl text-white">Stay connected with us</h2>
        <form className="mx-5">
          <input
            type="text"
            placeholder="Email Address"
            className="p-3 w-full lg:w-96 mt-5 rounded"
          />
          <br />
          <input
            type="text"
            placeholder="Subject"
            className="p-3 w-full lg:w-96 mt-5 rounded"
          />
          <br />
          <textarea
            placeholder="Your message"
            className="extarea h-24 p-3 w-full lg:w-96 mt-5 mb-2 rounded"
          ></textarea>
          <br />
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
