// import { useEffect, useState } from "react";
// import axios from "axios";
// import QRCode from "react-qr-code";
// import { toast } from "react-toastify";
// import "./ProfileSettings.css";
// import api from "../services/api";

// function ProfileSettings() {
//   const [profile, setProfile] = useState({});
//   const [originalProfile, setOriginalProfile] = useState({});
//   const [show2faModal, setShow2faModal] = useState(false);
//   const [twoFaSecret, setTwoFaSecret] = useState("");
//   const [otpAuthUrl, setOtpAuthUrl] = useState("");
//   const [twoFaCode, setTwoFaCode] = useState("");
//   const [verifyLoading, setVerifyLoading] = useState(false);
//   const [verifyError, setVerifyError] = useState("");
//   const [twoFaEnabled, setTwoFaEnabled] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   async function fetchProfile() {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/get-profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Profile Data:", response?.data);

//       const profileData = response.data?.data ?? {};
//       setProfile(profileData);
//       setOriginalProfile(profileData);
//       setTwoFaEnabled(
//         Boolean(
//           profileData.twoFactorEnabled ||
//             profileData.is2FAEnabled ||
//             profileData.isTwoFactorEnabled
//         )
//       );
//     } catch (error) {
//       console.error(error);
//       toast.error("Unable to load profile data.");
//     }
//   }
//
//   function handleChange(e) {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleCancel() {
//     setProfile(originalProfile);
//   }

//   async function handleSave() {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/update-profile",
//         {
//           firstName: profile.firstName,
//           lastName: profile.lastName,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Profile updated successfully!");
//       setOriginalProfile(profile);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update profile.");
//     }
//   }

//   const formatSecret = (value) => {
//     const cleaned = value
//       .toUpperCase()
//       .replace(/[^A-Z0-9]/g, "")
//       .slice(0, 32)
//       .padEnd(32, "A");
//     return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
//   };

//   const open2faModal = () => {
//     const secret = formatSecret(profile.email || "VAULTXUSER");
//     const emailLabel = encodeURIComponent(profile.email || "user@vaultx.com");
//     const uri = `otpauth://totp/VaultX:${emailLabel}?secret=${secret.replace(/\s/g,"")}&issuer=VaultX`;

//     setTwoFaSecret(secret);
//     setOtpAuthUrl(uri);
//     setTwoFaCode("");
//     setVerifyError("");
//     setShow2faModal(true);
//   };

//   const handleVerify2fa = async () => {
//     if (twoFaCode.trim().length !== 6) {
//       setVerifyError("Enter a valid 6-digit code.");
//       return;
//     }

//     setVerifyLoading(true);
//     setVerifyError("");

//     try {
//       const token = localStorage.getItem("token");

//       const response = await api.post(
//         "/auth/2fa/verify",
//         { code: twoFaCode.trim() },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const success = response.data?.success ?? response.data?.status === "success";

//       if (!success) {
//         throw new Error(response.data?.message || "Unable to verify code.");
//       }

//       setTwoFaEnabled(true);
//       setShow2faModal(false);
//       toast.success("Two-factor authentication enabled.");
//     } catch (error) {
//       console.error(error);
//       setVerifyError(
//         error.response?.data?.message || error.message || "Verification failed."
//       );
//     } finally {
//       setVerifyLoading(false);
//     }
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-header">
//         <h1>Profile Settings</h1>
//         <p>Manage your account profile and security permissions.</p>
//       </div>

//       <div className="profile-card">
//         <div className="avatar">
//           {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
//         </div>

//         <div className="profile-grid">
//           <div className="form-group">
//             <label>First Name</label>
//             <input
//               name="firstName"
//               value={profile.firstName || ""}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Last Name</label>
//             <input
//               name="lastName"
//               value={profile.lastName || ""}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group full-width">
//             <label>Email Address</label>
//             <input value={profile.email || ""} disabled />
//           </div>

//           <div className="form-group">
//             <label>Role</label>
//             <input value={profile.role || ""} disabled />
//           </div>

//           <div className="form-group">
//             <label>Wallet Address</label>
//             <input value={profile.walletAddress || ""} disabled />
//           </div>
//         </div>

//         <div className="profile-actions">
//           <button className="cancel-btn" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button className="save-btn" onClick={handleSave}>
//             Save Changes
//           </button>
//         </div>
//       </div>

//       <div className="security-card">
//         <h2>Security Settings</h2>

//         <div className="security-item">
//           <div>
//             <h4>Password</h4>
//             <p>Update your account password and sign-in security.</p>
//           </div>
//           <button className="password-btn">Change Password</button>
//         </div>

//         <div className="security-item">
//           <div>
//             <h4>Two-Factor Authentication</h4>
//             <p>
//               {twoFaEnabled
//                 ? "Two-factor authentication is enabled."
//                 : "Add an extra layer of security."}
//             </p>
//           </div>
//           <button
//             className="enable-2fa-btn"
//             onClick={open2faModal}
//             disabled={twoFaEnabled}
//           >
//             {twoFaEnabled ? "Enabled" : "Enable 2FA"}
//           </button>
//         </div>
//       </div>

//       {show2faModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Enable Two-Factor Authentication</h3>
//             <p className="modal-description">
//               Scan the QR code with your authenticator app (Google Authenticator,
//               Authy, etc.) and enter the 6-digit code.
//             </p>

//             <div className="qr-section">
//               <div className="qr-card">
//                 {otpAuthUrl ? (
//                   <QRCode value={otpAuthUrl} size={188} level="Q" />
//                 ) : (
//                   <div className="qr-placeholder">Loading QR code...</div>
//                 )}
//               </div>

//               <div className="secret-block">
//                 <label>Secret Key</label>
//                 <div className="secret-key">{twoFaSecret}</div>
//                 <p className="secret-note">
//                   Save this secret key in a safe place. You’ll need it if you lose
//                   access to your authenticator app.
//                 </p>
//               </div>
//             </div>

//             <div className="otp-section">
//               <label>Enter authentication code</label>
//               <input
//                 type="text"
//                 maxLength={6}
//                 value={twoFaCode}
//                 onChange={(e) => {
//                   const raw = e.target.value.replace(/\D/g, "");
//                   setTwoFaCode(raw);
//                   setVerifyError("");
//                 }}
//               />
//               {verifyError && <p className="verify-error">{verifyError}</p>}
//             </div>

//             <div className="modal-actions">
//               <button
//                 className="cancel-btn"
//                 type="button"
//                 onClick={() => setShow2faModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="confirm-btn"
//                 type="button"
//                 onClick={handleVerify2fa}
//                 disabled={twoFaCode.trim().length !== 6 || verifyLoading}
//               >
//                 {verifyLoading ? "Confirming..." : "Confirm"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileSettings;   












import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import "./ProfileSettings.css";
import api from "../services/api";

const API_BASE = "https://vaultx-user-api.staging-host.com/api/v1/auth";

function ProfileSettings() {
  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  const [show2faModal, setShow2faModal] = useState(false);
  const [twoFaSecret, setTwoFaSecret] = useState("");
  const [otpAuthUrl, setOtpAuthUrl] = useState("");
  const [twoFaCode, setTwoFaCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  function authHeader() {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  async function loadProfile() {
    try {
      const res = await axios.get(`${API_BASE}/get-profile`, authHeader());
      const data = res.data?.data || {};

      setProfile(data);
      setOriginalProfile(data);
      setTwoFaEnabled(!!data.twoFactorEnabled);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile data.");
    }
  }

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleCancel() {
    setProfile(originalProfile);
  }

  async function handleSave() {
    try {
      await axios.put(
        `${API_BASE}/update-profile`,
        { firstName: profile.firstName, lastName: profile.lastName },
        authHeader()
      );

      setOriginalProfile(profile);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  }
  function generateSecret(email) {
    const base = (email || "VAULTXUSER").toUpperCase().replace(/[^A-Z0-9]/g, "");
    const padded = base.padEnd(32, "A").slice(0, 32);

    const groups = [];
    for (let i = 0; i < padded.length; i += 4) {
      groups.push(padded.slice(i, i + 4));
    }
    return groups.join(" ");
  }

  function openTwoFaModal() {
    const secret = generateSecret(profile.email);
    const email = encodeURIComponent(profile.email || "user@vaultx.com");
    const secretNoSpaces = secret.replace(/\s/g, "");

    setTwoFaSecret(secret);
    setOtpAuthUrl(`otpauth://totp/VaultX:${email}?secret=${secretNoSpaces}&issuer=VaultX`);
    setTwoFaCode("");
    setVerifyError("");
    setShow2faModal(true);
  }

  function handleCodeChange(e) {
    setTwoFaCode(e.target.value.replace(/\D/g, ""));
    setVerifyError("");
  }

  async function handleVerify2fa() {
    if (twoFaCode.length !== 6) {
      setVerifyError("Enter a valid 6-digit code.");
      return;
    }

    setVerifyLoading(true);
    setVerifyError("");

    try {
      const res = await api.post(
        "/auth/2fa/verify",
        { code: twoFaCode },
        authHeader()
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Unable to verify code.");
      }

      setTwoFaEnabled(true);
      setShow2faModal(false);
      toast.success("Two-factor authentication enabled.");
    } catch (err) {
      console.error(err);
      setVerifyError(err.response?.data?.message || err.message || "Verification failed.");
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your account profile and security permissions.</p>
      </div>

      <div className="profile-card">
        <div className="avatar">
          {profile.firstName?.charAt(0)}
          {profile.lastName?.charAt(0)}
        </div>

        <div className="profile-grid">
          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={profile.firstName || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={profile.lastName || ""} onChange={handleChange} />
          </div>

          <div className="form-group full-width">
            <label>Email Address</label>
            <input value={profile.email || ""} disabled />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input value={profile.role || ""} disabled />
          </div>

          <div className="form-group">
            <label>Wallet Address</label>
            <input value={profile.walletAddress || ""} disabled />
          </div>
        </div>

        <div className="profile-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>

      <div className="security-card">
        <h2>Security Settings</h2>

        <div className="security-item">
          <div>
            <h4>Password</h4>
            <p>Update your account password and sign-in security.</p>
          </div>
          <button className="password-btn">Change Password</button>
        </div>

        <div className="security-item">
          <div>
            <h4>Two-Factor Authentication</h4>
            <p>{twoFaEnabled ? "Two-factor authentication is enabled." : "Add an extra layer of security."}</p>
          </div>
          <button className="enable-2fa-btn" onClick={openTwoFaModal} disabled={twoFaEnabled}>
            {twoFaEnabled ? "Enabled" : "Enable 2FA"}
          </button>
        </div>
      </div>

      {show2faModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enable Two-Factor Authentication</h3>
            <p className="modal-description">
              Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
              and enter the 6-digit code.
            </p>

            <div className="qr-section">
              <div className="qr-card">
                {otpAuthUrl ? (
                  <QRCode value={otpAuthUrl} size={188} level="Q" />
                ) : (
                  <div className="qr-placeholder">Loading QR code...</div>
                )}
              </div>

              <div className="secret-block">
                <label>Secret Key</label>
                <div className="secret-key">{twoFaSecret}</div>
                <p className="secret-note">
                  Save this secret key in a safe place. You'll need it if you lose access to your
                  authenticator app.
                </p>
              </div>
            </div>

            <div className="otp-section">
              <label>Enter authentication code</label>
              <input type="text" maxLength={6} value={twoFaCode} onChange={handleCodeChange} />
              {verifyError && <p className="verify-error">{verifyError}</p>}
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" type="button" onClick={() => setShow2faModal(false)}>
                Cancel
              </button>
              <button
                className="confirm-btn"
                type="button"
                onClick={handleVerify2fa}
                disabled={twoFaCode.length !== 6 || verifyLoading}
              >
                {verifyLoading ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;