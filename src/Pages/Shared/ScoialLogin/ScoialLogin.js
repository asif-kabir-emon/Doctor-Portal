import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import toast from "react-hot-toast";

const ScoialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    fetch(`https://doctors-portal-server-psi.vercel.app/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log();
      });
  }, [email]);

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result._tokenResponse;
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("failed to login");
      });
  };

  const saveUser = (name, email) => {
    setEmail(email);
    if (users.length === 0) {
      const user = { name, email };
      fetch(`https://doctors-portal-server-psi.vercel.app/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            createToken(email);
          }
        });
    } else {
      createToken(email);
    }
  };

  const createToken = (email) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate(from, { replace: true });
          toast.success("successfully login");
        }
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline btn-accent w-full mt-2"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default ScoialLogin;
