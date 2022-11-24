import React from "react";
import useTitle from "../../../Hooks/useTitle";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import InfoCard from "../InfoCard/InfoCard";
import MakerAppointment from "../MakerAppointment/MakerAppointment";
import Services from "../Services/Services";
import Terms from "../Terms/Terms";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  useTitle("Home");

  return (
    <div className="mx-5">
      <Banner></Banner>
      <InfoCard></InfoCard>
      <Services></Services>
      <Terms></Terms>
      <MakerAppointment></MakerAppointment>
      <Testimonial></Testimonial>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
