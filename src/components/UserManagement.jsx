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
const [deleting, setDeleting] = useState(false);

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
  if (!roleId) {
    alert("Role ID not found.");
    return;
  }

  try {
    setDeleting(true);

    console.log("Deleting Role ID:", roleId);

    const response = await axios.delete(
      `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Delete Response:", response.data);

    alert(response.data.message || "Role deleted successfully");

    setShowDeleteModal(false);
    setRoleId("");
    setSelectedRole(null);

    getRoles();
  } catch (error) {
    console.error("Delete Role Error:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);

      alert(
        error.response.data?.message ||
          `Error ${error.response.status}: Failed to delete role`
      );
    } else if (error.request) {
      alert("No response received from the server.");
    } else {
      alert(error.message);
    }
  } finally {
    setDeleting(false);
  }
};
  // const deleteRole = async () => {
  //   try {
  //     await axios.delete(
  //       `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-role/${roleId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     alert("Role deleted successfully");

  //     setRoleId("");
  //     setShowDeleteModal(false);

  //     getRoles();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed to delete role");
  //   }
  // };

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
              {roles.map((role) => {
                const roleIdValue = role.id || role._id;

                return (
                  <div
                    className="role-card"
                    key={roleIdValue || role.name}
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
                          setRoleId(roleIdValue);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                );
              })}
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

                 