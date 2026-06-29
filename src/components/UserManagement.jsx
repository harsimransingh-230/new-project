// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import "./Usermanagement.css"
// // // // import "./UserManagement.css";
// // // import CreateRole from "./CreateRole";
// // // import api from "../services/api";
// // // import EditRole from "./EditRole";


// // // const UserManagement = () => {
// // //   const [roles, setRoles] = useState([]);
// // //   const [error, setError] = useState("");
// // //   const [showModal, setShowModal] = useState(false);

// // //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// // //   const [roleId, setRoleId] = useState("");

// // // const[showEditModal,setShowEditModal]=useState(false);
// // // const[selectedRole, setSelectedRole]=useState("");


// // //   const token = localStorage.getItem("token");

// // //   const getRoles = async () => {
// // //     try {
// // //       const res = await axios.get(
// // //         "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=10",
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       setRoles(res.data?.data?.roles || []);
// // //     } catch (err) {
// // //       console.log(err);
// // //       setError("Failed to fetch roles");
// // //     }
// // //   };

// // //   const deleteRole = async () => {
// // //     try {
// // //       if  (roleId){
// // //         await axios.delete(
// // //           `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,

// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       alert("Role Deleted Successfully");

// // //       setShowDeleteModal(false);
// // //       setRoleId("");

// // //       getRoles();
// // //     }
// // //   }
      
// // //     //   await axios.delete(
// // //     //       `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,

// // //     //     {
// // //     //       headers: {
// // //     //         Authorization: `Bearer ${token}`,
// // //     //       },
// // //     //     }
// // //     //   );

// // //     //   alert("Role Deleted Successfully");

// // //     //   setShowDeleteModal(false);
// // //     //   setRoleId("");

// // //     //   getRoles();
// // //     // } 
// // //     catch (error) {
// // //       console.log(error);
// // //       alert("Failed to delete role");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getRoles();
// // //   }, []);

// // //   return (
// // //     <div className="user-management">
// // //       <h1>Roles</h1>

// // //       <button onClick={() => setShowModal(true)}>
// // //         Create Role
// // //       </button>

// // //       {showModal && (
// // //         <CreateRole onClose={() => setShowModal(false)} />
// // //       )}


// // // {showEditModal && selectedRole && (
// // //   <EditRole
// // //     role={selectedRole}
// // //     onClose={() => setShowEditModal(false)}
// // //     getRoles={getRoles}
// // //   />
// // // )}
// // // {showDeleteModal && (
// // //   <div className="modal-overlay">
// // //     <div className="delete-modal">
// // //       <h3>Are you sure you want to delete this role?</h3>

// // //       <div className="modal-buttons">
// // //         <button className="yes-btn" onClick={deleteRole}>
// // //           Yes
// // //         </button>

// // //         <button
// // //           className="no-btn"
// // //           onClick={() => setShowDeleteModal(false)}
// // //         >
// // //           No
// // //         </button>
// // //       </div>
// // //     </div>
// // //   </div>
// // // )}

// // //       {roles.map((role) => (
// // //         <div className="role-card" key={role._id}>
// // //           <h3>{role.name}</h3>

// // //           <p>{role.description}</p>

    
// // // <button onClick={()=>{
// // //   console.log(role)
// // //   setRoleId(role.id);
// // //   setShowDeleteModal(true);
// // // }}> Delete</button>


// // // <button onClick={()=>{
// // // setSelectedRole(role)
// // // setShowEditModal(true);
// // // }}>Edit</button>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default UserManagement;




// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Usermanagement.css";
// // import CreateRole from "./CreateRole";
// // import EditRole from "./EditRole";
// // import Users from "./Users";

// // const UserManagement = () => {
// //   const [roles, setRoles] = useState([]);
// //   const [showUsers, setShowUsers] = useState(false);

// //   const [showModal, setShowModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);

// //   const [roleId, setRoleId] = useState("");
// //   const [selectedRole, setSelectedRole] = useState("");

// //   const token = localStorage.getItem("token");

// //   const getRoles = async () => {
// //     try {
// //       const res = await axios.get(
// //         "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=10",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setRoles(res.data?.data?.roles || []);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   useEffect(() => {
// //     getRoles();
// //   }, []);

// //   return (
// //     <div className="user-management">

// //       <div className="top-buttons">
// //         <button
// //           className={!showUsers ? "active-btn" : ""}
// //           onClick={() => setShowUsers(false)}
// //         >
// //           Roles
// //         </button>

// //         <button
// //           className={showUsers ? "active-btn" : ""}
// //           onClick={() => setShowUsers(true)}
// //         >
// //           Users
// //         </button>
// //       </div>

// //       {/* USERS SCREEN */}
// //       {showUsers ? (
// //         <Users token={token} />
// //       ) : (
// //         <>
// //           <h1>Roles</h1>

// //           <button onClick={() => setShowModal(true)}>
// //             Create Role
// //           </button>

// //           {showModal && (
// //             <CreateRole onClose={() => setShowModal(false)} />
// //           )}

// //           {showEditModal && selectedRole && (
// //             <EditRole
// //               role={selectedRole}
// //               onClose={() => setShowEditModal(false)}
// //               getRoles={getRoles}
// //             />
// //           )}

// //           {roles.map((role) => (
// //             <div className="role-card" key={role._id}>
// //               <h3>{role.name}</h3>

// //               <p>{role.description}</p>

// //               <button
// //                 onClick={() => {
// //                   setRoleId(role.id);
// //                   setShowDeleteModal(true);
// //                 }}
// //               >
// //                 Delete
// //               </button>

// //               <button
// //                 onClick={() => {
// //                   setSelectedRole(role);
// //                   setShowEditModal(true);
// //                 }}
// //               >
// //                 Edit
// //               </button>
// //             </div>
// //           ))}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserManagement;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Usermanagement.css";
// import CreateRole from "./CreateRole";
// import EditRole from "./EditRole";
// import Users from "./Users";

// const UserManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [showUsers, setShowUsers] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [roleId, setRoleId] = useState("");
//   const [selectedRole, setSelectedRole] = useState(null);

//   const token = localStorage.getItem("token");

//   const getRoles = async () => {
//     try {
//       const res = await axios.get(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=20",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setRoles(res.data?.data?.roles || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteRole = async () => {
//     try {
//       await axios.delete(
//         `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setShowDeleteModal(false);
//       setRoleId("");
//       getRoles();

//       alert("Role deleted successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Failed to delete role");
//     }
//   };

//   useEffect(() => {
//     getRoles();
//   }, []);

//   return (
//     <div className="user-management">
//       {/* Header */}
//       <div className="page-header">
//         <h1>User Management</h1>
//         <p>
//           Manage users, roles, permissions and monitor system activity
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="tabs">
//         <button
//           className={!showUsers ? "tab active-tab" : "tab"}
//           onClick={() => setShowUsers(false)}
//         >
//           Role Permissions
//         </button>

//         <button
//           className={showUsers ? "tab active-tab" : "tab"}
//           onClick={() => setShowUsers(true)}
//         >
//           User Management
//         </button>
//       </div>

//       {/* Users Page */}
//       {showUsers ? (
//         <Users token={token} />
//       ) : (
//         <>
//           <div className="roles-header">
//             <h2>Role Permissions</h2>

//             <button
//               className="add-role-btn"
//               onClick={() => setShowModal(true)}
//             >
//               + Add Role
//             </button>
//           </div>

//           {/* Create Role Modal */}
//           {showModal && (
//             <CreateRole
//               onClose={() => {
//                 setShowModal(false);
//                 getRoles();
//               }}
//             />
//           )}

//           {/* Edit Role Modal */}
//           {showEditModal && selectedRole && (
//             <EditRole
//               role={selectedRole}
//               onClose={() => setShowEditModal(false)}
//               getRoles={getRoles}
//             />
//           )}

//           {/* Delete Modal */}
//           {showDeleteModal && (
//             <div className="modal-overlay">
//               <div className="delete-modal">
//                 <h3>
//                   Are you sure you want to delete this role?
//                 </h3>

//                 <div className="modal-buttons">
//                   <button
//                     className="yes-btn"
//                     onClick={deleteRole}
//                   >
//                     Delete
//                   </button>

//                   <button
//                     className="no-btn"
//                     onClick={() =>
//                       setShowDeleteModal(false)
//                     }
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Roles Grid */}
//           <div className="roles-grid">
//             {roles.map((role) => (
//               <div className="role-card" key={role._id}>
//                 <div className="role-top">
//                   <h3>{role.name}</h3>

//                   <span className="permission-badge">
//                     {role.permissions?.length || 0} Permissions
//                   </span>
//                 </div>

//                 <p className="role-description">
//                   {role.description || "No description"}
//                 </p>

//                 {/* Permissions */}
//                 <div className="permissions-list">
//                   {role.permissions?.length > 0 ? (
//                     role.permissions.map((permission, index) => (
//                       <div
//                         className="permission-row"
//                         key={index}
//                       >
//                         <span>
//                           {permission.permissionName ||
//                             permission.name ||
//                             permission}
//                         </span>

//                         <span className="enabled">
//                           Enabled
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No permissions assigned</p>
//                   )}
//                 </div>

//                 {/* Buttons */}
//                 <div className="role-actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() => {
//                       setSelectedRole(role);
//                       setShowEditModal(true);
//                     }}
//                   >
//                     Edit Permissions
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() => {
//                       setRoleId(role._id);
//                       setShowDeleteModal(true);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
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
import ActivityLogs from "./ActivityLogs";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");

  const [roles, setRoles] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [roleId, setRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const token = localStorage.getItem("token");

  const getRoles = async () => {
    try {
      const response = await axios.get(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-roles-list?page=1&limit=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoles(response.data?.data?.roles || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRole = async () => {
    try {
      await axios.delete(
        `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Role deleted successfully");

      setRoleId("");
      setShowDeleteModal(false);

      getRoles();
    } catch (error) {
      console.log(error);
      alert("Failed to delete role");
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="user-management-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>User Management</h1>

        <p>
          Manage users, roles, permissions, and monitor system activity
        </p>
      </div>

      {/* Main Card */}
      <div className="management-card">

        {/* Tabs */}
        <div className="tabs-header">

          <button
            className={`tab-btn ${
              activeTab === "users" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>

          <button
            className={`tab-btn ${
              activeTab === "roles" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("roles")}
          >
            Role Permissions
          </button>

          <button
            className={`tab-btn ${
              activeTab === "activity" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity Logs
          </button>
        </div>

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <div className="tab-content">
            <Users token={token} />
          </div>
        )}

        {/* ROLE MANAGEMENT */}
        {activeTab === "roles" && (
          <div className="tab-content">

            <div className="roles-header">
              <h2>Role Permissions</h2>

              <button
                className="add-role-btn"
                onClick={() => setShowModal(true)}
              >
                + Add Role
              </button>
            </div>

            {/* Create Role */}
            {showModal && (
              <CreateRole
                onClose={() => {
                  setShowModal(false);
                  getRoles();
                }}
              />
            )}

            {/* Edit Role */}
            {showEditModal && selectedRole && (
              <EditRole
                role={selectedRole}
                onClose={() => setShowEditModal(false)}
                getRoles={getRoles}
              />
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
              <div className="modal-overlay">
                <div className="delete-modal">

                  <h3>
                    Are you sure you want to delete this role?
                  </h3>

                  <div className="modal-buttons">

                    <button
                      className="yes-btn"
                      onClick={deleteRole}
                    >
                      Delete
                    </button>

                    <button
                      className="no-btn"
                      onClick={() =>
                        setShowDeleteModal(false)
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              </div>
            )}

            <div className="roles-grid">
              {roles.map((role) => (
                <div
                  className="role-card"
                  key={role._id}
                >
                  <div className="role-top">

                    <h3>{role.name}</h3>

                    <span className="permission-badge">
                      {role.permissions?.length || 0}
                      {" "}Permissions
                    </span>

                  </div>

                  <p className="role-description">
                    {role.description || "No description"}
                  </p>

                  <div className="permissions-list">

                    {role.permissions?.length > 0 ? (
                      role.permissions.map(
                        (permission, index) => (
                          <div
                            className="permission-row"
                            key={index}
                          >
                            <span>
                              {permission.permissionName ||
                                permission.name ||
                                permission}
                            </span>

                            <span className="enabled">
                              Enabled
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p>No permissions assigned</p>
                    )}

                  </div>

                  <div className="role-actions">

                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowEditModal(true);
                      }}
                    >
                      Edit Permissions
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setRoleId(role._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY LOGS */}
        {activeTab === "activity" && (
          <div className="tab-content">
            <ActivityLogs />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

