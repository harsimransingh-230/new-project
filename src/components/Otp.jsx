// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../services/api";
// // import "./otp.css";

// // const Otp = () => {
// //   const [otp, setOtp] = useState("");

// //   const navigate = useNavigate();

// //   const email = localStorage.getItem("email");

// //   const verifyOtp = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await api.post("/verify-otp", {
// //         email: email?.trim(),
// //         otp: otp.trim(),
// //       });

// //       console.log(res.data);

// //       const token =
// //         res.data.accessToken ||
// //         res.data.token ||
// //         res.data.data?.accessToken ||
// //         res.data.data?.token;

// //       if (!token) {        res.data.data?.accessToken ||
// //         res.data.data?.token;

// //       if (!token) {
// //         throw new Error("Token not found in OTP response");
// //       }

// //       localStorage.setItem("token", token);

// //         throw new Error("Token not found in OTP response");
// //       }

// //       localStorage.setItem("token", token);

// //       alert("OTP Verified");

// //       navigate("/dashboard");
// //     } catch (error) {
// //       console.log(error);

// //       alert("Invalid OTP");
// //     }
// //   };

// //   return (
// //     <div className="otp-container">
// //       <form onSubmit={verifyOtp} className="otp-form">
// //         <h2>OTP Page</h2>

// //         <input
// //           type="text"
// //           placeholder="Enter OTP"
// //           value={otp}
// //           onChange={(e) => setOtp(e.target.value)}
// //           className="otp-input"
// //         />

// //         <button type="submit" className="otp-btn">
// //           Verify OTP
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Otp;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import "./otp.css";

// const Otp = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputs = useRef([]);

//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   const handleChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pastedData = e.clipboardData
//       .getData("text")
//       .slice(0, 6)
//       .split("");

//     const newOtp = [...otp];

//     pastedData.forEach((digit, index) => {
//       if (/^\d$/.test(digit)) {
//         newOtp[index] = digit;
//       }
//     });

//     setOtp(newOtp);
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     const otpValue = otp.join("");

//     try {
//       const res = await api.post("/verify-otp", {
//         email: email?.trim(),
//         otp: otpValue,
//       });

//       const token =
//         res.data.accessToken ||
//         res.data.token ||
//         res.data.data?.accessToken ||
//         res.data.data?.token;

//       if (!token) {
//         throw new Error("Token not found");
//       }

//       localStorage.setItem("token", token);

//       alert("OTP Verified");
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="otp-container">
//       <div className="otp-card">
//         <div className="otp-icon">
//           <span>🛡️</span>
//         </div>

//         <h2>Verify OTP</h2>

//         <p className="otp-text">
//           Enter the 6-digit code sent to
//           <br />
//           <strong>{email}</strong>
//         </p>

//         <form onSubmit={verifyOtp}>
//           <div className="otp-boxes" onPaste={handlePaste}>
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputs.current[index] = el)}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) =>
//                   handleChange(e.target.value, index)
//                 }
//                 onKeyDown={(e) =>
//                   handleKeyDown(e, index)
//                 }
//                 className="otp-box"
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="otp-btn"
//             disabled={otp.join("").length !== 6}
//           >
//             Verify OTP
//           </button>
//         </form>

//         <p className="resend-text">
//           Didn't receive the code?
//         </p>

//         <button className="resend-btn">
//           Resend OTP
//         </button>

//         <button
//           className="back-btn"
//           onClick={() => navigate("/")}
//         >
//           ← Back to Login
//         </button>

//         <p className="security-text">
//           Protected by enterprise-grade security
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Otp; 



import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

import api from "../services/api";
import "./otp.css";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newOtp = [...otp];

    pastedData.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputs.current[nextIndex]?.focus();
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await api.post("/verify-otp", {
        email: email?.trim(),
        otp: otpValue,
      });

      console.log(res.data);

      const token =
        res.data.accessToken ||
        res.data.token ||
        res.data.data?.accessToken ||
        res.data.data?.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      toast.success("OTP Verified Successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    }
  };

  const resendOtp = async () => {
    try {
      await api.post("/login", {
        email: email?.trim(),
      });

      toast.success("OTP has been sent again.");

      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to resend OTP."
      );
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <div className="otp-icon">
          <span>🛡️</span>
        </div>

        <h2>Verify OTP</h2>
        

        <p className="otp-text">
          Enter the 6-digit verification code sent to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={verifyOtp}>
          <div className="otp-boxes" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                className="otp-box"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="otp-btn"
            disabled={otp.join("").length !== 6}
          >
            Verify OTP
          </button>
        </form>

        <p className="resend-text">
          Didn't receive the code?
        </p>

        <button
          type="button"
          className="resend-btn"
          onClick={resendOtp}
        >
          Resend OTP
        </button>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Login
        </button>

        <p className="security-text">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default Otp;