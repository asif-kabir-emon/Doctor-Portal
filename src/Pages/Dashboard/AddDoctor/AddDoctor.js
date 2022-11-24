import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-psi.vercel.app/appointmentSpecialty",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const handleAddDoctor = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };
          fetch(`https://doctors-portal-server-psi.vercel.app/doctors`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                navigate("/dashboard/manageDoctor");
                toast.success("Successfully Added a Doctor");
              } else {
                toast.error("failed to add doctor");
              }
            });
        }
      });
  };

  return (
    <div className="mx-4">
      <h2 className="text-3xl mb-5">Add a New Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)} className="md:w-96">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: true, minLength: 4 })}
            type="text"
            placeholder="Enter Your Name"
            className="input input-bordered w-full"
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-xs text-red-500 my-2">
              Doctor must have a name (more than in 4 characters)
            </span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: true, minLength: 4 })}
            type="email"
            placeholder="Enter Your email"
            className="input input-bordered w-full"
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-xs text-red-500 my-2">
              Required Your Valid Email
            </span>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty", { required: true })}
            className="select select-bordered w-full"
          >
            {specialties.map((specialty) => (
              <option
                key={specialty._id}
                value={specialty.name}
                className="font-normal"
              >
                {specialty.name}
              </option>
            ))}
            <option>Greedo</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("img", { required: true })}
            type="file"
            placeholder="Upload Doctor Photo"
            className="file-input file-input-bordered w-full"
          />
          {errors.file && errors.file.type === "required" && (
            <span className="text-xs text-red-500 my-2">
              Please Select Your Image
            </span>
          )}
        </div>
        <input
          type="submit"
          value="Add"
          className="btn btn-accent text-white w-full mt-4"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
