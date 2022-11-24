import React from "react";
import img1 from "../../../Assets/icons/clock.svg";
import img2 from "../../../Assets/icons/marker.svg";
import img3 from "../../../Assets/icons/phone.svg";

const InfoCard = () => {
  const cardData = [
    {
      id: 1,
      image: img1,
      name: "Opening Hours",
      description: "Lorem Ipsum is simply dummy text of the pri",
      color: "bg-gradient-to-r from-primary to-secondary",
    },
    {
      id: 2,
      image: img2,
      name: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      color: "bg-accent",
    },
    {
      id: 3,
      image: img3,
      name: "Contact us now",
      description: "+000 123 456789",
      color: "bg-gradient-to-r from-primary to-secondary",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-3">
      {cardData.map((card) => (
        <div
          key={card.id}
          className={`flex flex-col lg:flex-row items-center ${card.color} text-white px-6 py-10 rounded-xl`}
        >
          <img
            src={card.image}
            alt="clock"
            className="h-20 mr-4  mb-5 lg:mb-0"
          />
          <div>
            <h1 className="text-xl font-bold">{card.name}</h1>
            <p className="text-base">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
