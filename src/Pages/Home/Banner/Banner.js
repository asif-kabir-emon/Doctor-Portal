import React from "react";
import chairImage from "../../../Assets/images/chair.png";
import PrimaryButton from "../../../Components/PrimaryButton";
import bg from "../../../Assets/images/bg.png";

const Banner = () => {
  return (
    <div style={{ background: `url(${bg})` }}>
      <div className="hero py-20">
        <div className="hero-content flex-col lg:flex-row-reverse bg-gray-100/[.01]">
          <img src={chairImage} className="lg:w-1/2 rounded shadow-xl" alt="" />
          <div className="mr-6">
            <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
