// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Usermanagement.css"
// // import "./UserManagement.css";
// import CreateRole from "./CreateRole";
// import api from "../services/api";
// import EditRole from "./EditRole";


// const UserManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [roleId, setRoleId] = useState("");

// const[showEditModal,setShowEditModal]=useState(false);
// const[selectedRole, setSelectedRole]=useState("");


//   const token = localStorage.getItem("token");

//   const getRoles = async () => {
//     try {
//       const res = await axios.get(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=10",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setRoles(res.data?.data?.roles || []);
//     } catch (err) {
//       console.log(err);
//       setError("Failed to fetch roles");
//     }
//   };

//   const deleteRole = async () => {
//     try {
//       if  (roleId){
//         await axios.delete(
//           `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Role Deleted Successfully");

//       setShowDeleteModal(false);
//       setRoleId("");

//       getRoles();
//     }
//   }
      
//     //   await axios.delete(
//     //       `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,

//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`,
//     //       },
//     //     }
//     //   );

//     //   alert("Role Deleted Successfully");

//     //   setShowDeleteModal(false);
//     //   setRoleId("");

//     //   getRoles();
//     // } 
//     catch (error) {
//       console.log(error);
//       alert("Failed to delete role");
//     }
//   };

//   useEffect(() => {
//     getRoles();
//   }, []);

//   return (
//     <div className="user-management">
//       <h1>Roles</h1>

//       <button onClick={() => setShowModal(true)}>
//         Create Role
//       </button>

//       {showModal && (
//         <CreateRole onClose={() => setShowModal(false)} />
//       )}


// {showEditModal && selectedRole && (
//   <EditRole
//     role={selectedRole}
//     onClose={() => setShowEditModal(false)}
//     getRoles={getRoles}
//   />
// )}
// {showDeleteModal && (
//   <div className="modal-overlay">
//     <div className="delete-modal">
//       <h3>Are you sure you want to delete this role?</h3>

//       <div className="modal-buttons">
//         <button className="yes-btn" onClick={deleteRole}>
//           Yes
//         </button>

//         <button
//           className="no-btn"
//           onClick={() => setShowDeleteModal(false)}
//         >
//           No
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       {roles.map((role) => (
//         <div className="role-card" key={role._id}>
//           <h3>{role.name}</h3>

//           <p>{role.description}</p>

    
// <button onClick={()=>{
//   console.log(role)
//   setRoleId(role.id);
//   setShowDeleteModal(true);
// }}> Delete</button>


// <button onClick={()=>{
// setSelectedRole(role)
// setShowEditModal(true);
// }}>Edit</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserManagement;




import { useEffect, useState } from "react";
import axios from "axios";
import "./Usermanagement.css";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import Users from "./Users";

const UserManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [roleId, setRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const token = localStorage.getItem("token");

  const getRoles = async () => {
    try {
      const res = await axios.get(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoles(res.data?.data?.roles || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="user-management">

      <div className="top-buttons">
        <button
          className={!showUsers ? "active-btn" : ""}
          onClick={() => setShowUsers(false)}
        >
          Roles
        </button>

        <button
          className={showUsers ? "active-btn" : ""}
          onClick={() => setShowUsers(true)}
        >
          Users
        </button>
      </div>

      {/* USERS SCREEN */}
      {showUsers ? (
        <Users token={token} />
      ) : (
        <>
          <h1>Roles</h1>

          <button onClick={() => setShowModal(true)}>
            Create Role
          </button>

          {showModal && (
            <CreateRole onClose={() => setShowModal(false)} />
          )}

          {showEditModal && selectedRole && (
            <EditRole
              role={selectedRole}
              onClose={() => setShowEditModal(false)}
              getRoles={getRoles}
            />
          )}

          {roles.map((role) => (
            <div className="role-card" key={role._id}>
              <h3>{role.name}</h3>

              <p>{role.description}</p>

              <button
                onClick={() => {
                  setRoleId(role.id);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setSelectedRole(role);
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserManagement;
