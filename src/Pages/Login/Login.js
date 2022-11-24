import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useForm } from "react-hook-form";
import ScoialLogin from "../Shared/ScoialLogin/ScoialLogin";
import { AuthContext } from "../../Contexts/AuthProvider";
import toast from "react-hot-toast";
// import useToken from "../../Hooks/useToken";

const Login = () => {
  useTitle("Login");
  const { epLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const [loginUserEmail, setLoginUserEmail] = useState("");
  // let [token] = useToken(loginUserEmail);

  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const handleLogin = (data) => {
    console.log(data);
    epLogin(data.email, data.password)
      .then(() => {
        setLoginError("");
        // setLoginUserEmail(data.email);
        createToken(data.email);
        navigate(from, { replace: true });
        toast.success("successfully login");
      })
      .catch((error) => {
        setLoginError(error.message);
        toast.error("failed to login");
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
        <h4 className="text-3xl text-center">Login</h4>
        <br />
        {loginError !== "" && (
          <p className="text-sm text-red-600 text-center">{loginError}</p>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
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
              })}
              type="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p role="alert" className="my-1 text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="my-2 label-text">
            <Link to="/passwordRecovery">Forget Password?</Link>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-accent text-white w-full"
          />
        </form>
        <p className="text-sm text-center mt-3">
          <span> New to Doctors Portal?</span>
          <Link to="/signup" className="text-secondary mx-1">
            Create new accoount
          </Link>
        </p>
        <div className="divider mt-6">OR</div>
        <ScoialLogin></ScoialLogin>
      </div>
    </div>
  );
};

export default Login;
