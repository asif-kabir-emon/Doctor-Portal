import React from "react";
import quote from "../../../Assets/icons/quote.svg";
import people1 from "../../../Assets/images/people1.png";
import people2 from "../../../Assets/images/people2.png";
import people3 from "../../../Assets/images/people3.png";

const Testimonial = () => {
  const reviews = [
    {
      id: 1,
      name: "Winson Herry",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      image: people1,
    },
    {
      id: 2,
      name: "Winson Herry",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      image: people2,
    },
    {
      id: 3,
      name: "Winson Herry",
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      image: people3,
    },
  ];
  return (
    <section className="my-16">
      <div className="flex justify-between">
        <div>
          <h4 className="text-xl font-bold text-primary">Testimonial</h4>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <figure>
          <img src={quote} alt="" className="w-24 lg:w-48" />
        </figure>
      </div>
      <div className="grid lg:grid-cols-3 gap-3 mt-5">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p>{review.review}</p>
                <div className="card-actions items-center">
                  <img
                    src={review.image}
                    alt=""
                    className="w-16 rounded-full p-1 border-4 border-primary"
                  />
                  <div>
                    <h4>{review.name}</h4>
                    <h5>{review.location}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
