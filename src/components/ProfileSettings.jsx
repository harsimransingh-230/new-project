
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ProfileSettings.css";
// import api from "../services/api"; 
// function ProfileSettings() {
//   const [profile, setProfile] = useState({});

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

//       setProfile(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function handleChange(e) {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   }

//   return (
//     <div className="profile-page">
//       <h1>Profile Settings</h1>

//       <div className="profile-card">
//         <div className="avatar">
//           {profile.firstName?.charAt(0)}

//           {profile.lastName?.charAt(0)}
//         </div>

//         <div className="form-group">
//           <label>First Name</label>
//           <input
//             name="firstName"
//             value={profile.firstName || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Last Name</label>
//           <input
//             name="lastName"
//             value={profile.lastName || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input value={profile.email || ""} disabled />
//         </div>

//         <div className="form-group">
//           <label>Role</label>
//           <input value={profile.role || ""} disabled />
//         </div>

//         <div className="form-group">
//           <label>Wallet Address</label>
//           <input value={profile.walletAddress || ""} disabled />
//         </div>
// <button>Cancel</button>
//         <button>Save Changes</button>
//       </div>
//     </div>
//   );
// }

// export default ProfileSettings;



import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileSettings.css";
import api from "../services/api"; 


function ProfileSettings() {
  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.data);
      setOriginalProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  // Cancel changes
  function handleCancel() {
    setProfile(originalProfile);
  }

  // Save changes
  async function handleSave() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/update-profile",
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");

      // Update original data after successful save
      setOriginalProfile(profile);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to update profile.");
    }
  }

  return (
    <div className="profile-page">
      <h1>Profile Settings</h1>

      <div className="profile-card">
        <div className="avatar">
          {profile.firstName?.charAt(0)}
          {profile.lastName?.charAt(0)}
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={profile.firstName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={profile.lastName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
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

        <div className="profile-actions">
          <button onClick={handleCancel}>Cancel</button>

          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;