import React from "react";
import icon1 from "../../../Assets/images/fluoride.png";
import icon2 from "../../../Assets/images/cavity.png";
import icon3 from "../../../Assets/images/whitening.png";

const Services = () => {
  const serviceData = [
    {
      id: 1,
      icon: icon1,
      name: "Fluoride Treatment",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      id: 2,
      icon: icon2,
      name: "Cavity Filling",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      id: 3,
      icon: icon3,
      name: "Teeth Whitening",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];
  return (
    <div className="text-center my-10">
      <h4 className="text-secondary text-xl">Services</h4>
      <h2 className="text-4xl">Services We Provide</h2>
      <div className="grid lg:grid-cols-3 gap-3 my-10">
        {serviceData.map((service) => (
          <div key={service.id} className="mx-auto shadow-lg p-10 rounded">
            <img src={service.icon} className="h-20 mx-auto mb-5" alt="" />
            <h4 className="text-xl font-bold">{service.name}</h4>
            <p className="text-base">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
