import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useTitle from "../../Hooks/useTitle";
import ScoialLogin from "../Shared/ScoialLogin/ScoialLogin";
import { AuthContext } from "../../Contexts/AuthProvider";
import toast from "react-hot-toast";
// import useToken from "../../Hooks/useToken";

const SignUp = () => {
  useTitle("Sign Up");
  const { createUser, updateUser } = useContext(AuthContext);
  const [signupError, setSignupError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const [createdUserEmail, setCreatedUserEmail] = useState("");
  // const [token] = useToken(createdUserEmail);

  const handleSignUp = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then(() => {
        updateProfile(data.name);
        setSignupError("");
        saveUser(data.name, data.email);
        navigate(from, { replace: true });
        toast.success("successfully created account");
      })
      .catch((error) => {
        setSignupError(error.message);
        toast.error("failed to sign up");
      });
  };

  const updateProfile = (name) => {
    updateUser({ displayName: name })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("https://doctors-portal-server-psi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Save User:", data);
        createToken(email);
      });
  };

  const createToken = (email) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 mx-3 px-7 py-8 shadow-lg rounded-xl">
        <h4 className="text-3xl text-center">Sign Up</h4>
        <br />
        {signupError !== "" && (
          <p className="text-sm text-red-600 text-center">{signupError}</p>
        )}
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p role="alert" className="my-1 text-sm text-red-600">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p role="alert" className="my-1 text-sm text-red-600">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 chararcter or longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
                  message: "Password must be strong",
                },
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p role="alert" className="my-1 text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-accent text-white w-full"
          />
        </form>
        <p className="text-sm text-center mt-3">
          <span> Already have an account?</span>
          <Link to="/login" className="text-secondary ml-1">
            Log In
          </Link>
        </p>
        <div className="divider mt-6">OR</div>
        <ScoialLogin></ScoialLogin>
      </div>
    </div>
  );
};

export default SignUp;
