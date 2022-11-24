import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import useTitle from "../../Hooks/useTitle";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PasswordRecovery = () => {
  useTitle("Recovery Password");
  const { resetPassword } = useContext(AuthContext);
  const [isReset, setIsReset] = useState(false);
  const passwordRecoveryRef = useRef();

  const handleResetPassword = (event) => {
    event.preventDefault();
    let email = passwordRecoveryRef.current.value;
    console.log();
    if (email !== " " && isReset === false) {
      resetPassword(email)
        .then(() => {
          setIsReset(true);
          toast.success("check your email to reset password");
        })
        .catch((error) => {
          setIsReset(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 mx-3 px-7 py-8 shadow-lg rounded-xl">
        <h4 className="text-3xl text-center">Recovery Password</h4>
        <br />
        <form onSubmit={handleResetPassword}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              ref={passwordRecoveryRef}
              className="input input-bordered w-full"
              required
            />
          </div>
          <br />
          <input
            type="submit"
            value="Reset"
            className="btn btn-accent text-white w-full"
            disabled={isReset}
          />
        </form>

        {isReset && (
          <div className="mt-5 text-center">
            <span className="text-red-400">
              Check your email to Reset Password.
            </span>
            <br />
            <Link to="/login" className="text-green-500 underline">
              Go to Login Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
