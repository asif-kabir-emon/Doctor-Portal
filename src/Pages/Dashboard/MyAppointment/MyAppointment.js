import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `https://doctors-portal-server-psi.vercel.app/bookings?email=${user?.email}`;

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const [deletingAppointment, setDeletingAppointment] = useState(null);
  const closeModel = () => {
    setDeletingAppointment(null);
  };

  const handleDeleteAppointment = (id) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/bookings/${id}`, {
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
      <h3 className="text-3xl">My Appointment</h3>
      <div className="overflow-x-auto my-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Appointment</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{booking.patient}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>
                  {booking?.price && booking?.paid === true ? (
                    <span className="font-bold text-sm text-green-600">
                      Not Changable
                    </span>
                  ) : (
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => setDeletingAppointment(booking)}
                      className="btn btn-xs border-0 text-white bg-red-500 hover:bg-red-600"
                    >
                      Cancel
                    </label>
                  )}
                </td>
                <td>
                  {booking?.price && booking?.paid === false && (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-sm btn-primary">Pay</button>
                    </Link>
                  )}
                  {booking?.price && booking.paid === true && (
                    <button className="bg-green-600 text-sm px-3 py-1 text-white rounded-xl">
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingAppointment && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete appointment for ${deletingAppointment.treatment} on ${deletingAppointment.appointmentDate} at ${deletingAppointment.slot}, you cannot be undone`}
          closeModel={closeModel}
          successAction={handleDeleteAppointment}
          modalData={deletingAppointment}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyAppointment;
