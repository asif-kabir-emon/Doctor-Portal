import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModel = () => {
    setDeletingDoctor(null);
  };
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-psi.vercel.app/doctors`,
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

  const handleDeleteDoctor = (id) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/doctors/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((req) => req.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Successfully Delete the Doctor`);
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl ">
        Manage Doctors:{" "}
        {doctors.length < 10 && doctors.length > 0 && <span>0</span>}
        {doctors.length}
      </h2>
      <div className="overflow-x-auto w-full mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <td>
                  {index < 10 && <span>0</span>}
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img
                          src={doctor?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{doctor?.name}</td>
                <td>{doctor?.specialty}</td>
                <th>
                  <label
                    htmlFor="confirmation-modal"
                    onClick={() => setDeletingDoctor(doctor)}
                    className="btn border-none bg-red-500 hover:bg-red-600 btn-sm normal-case text-white"
                  >
                    Delete
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {deletingDoctor && (
          <ConfirmationModal
            title={`Are you sure you want to delete?`}
            message={`If you delete ${deletingDoctor.name}, you cannot be undone`}
            closeModel={closeModel}
            successAction={handleDeleteDoctor}
            modalData={deletingDoctor}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default ManageDoctor;
