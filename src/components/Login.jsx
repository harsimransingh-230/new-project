import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

const Login=()=> {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password,
      };
      await api.post("/login", payload);

      localStorage.setItem("email", email);

      alert("OTP Sent");

      navigate("/otp");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginUser} className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <div className="password-box">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="show-btn"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
        </Link>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;