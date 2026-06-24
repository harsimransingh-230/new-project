import { useState } from "react";
import api from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/forgot-password", {
        email,
      });

      alert("Reset Link Sent");
    } catch (error) {
      console.log(error);

      alert("Something Went Wrong");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="input"
        />

        <button type="submit" className="btn">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;