import React from "react";
import treatmentImage from "../../../Assets/images/treatment.png";

const Terms = () => {
  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img
              src={treatmentImage}
              className="lg:w-3/4 rounded shadow-2xl mx-auto"
              alt=""
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold">
              Exceptional Dental Care, on Your Terms
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
