import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-psi.vercel.app/users"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/users/admin/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Made Admin Successfully");
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl mb-5">
        All Users: {users.length < 10 && <span>0</span>}
        {users.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role !== "admin" ? (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="bg-green-400 px-2 py-1 rounded-full text-sm">
                      Admin
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
