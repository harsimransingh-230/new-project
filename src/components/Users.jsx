import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import AddUserModal from "./AddUserModal";
import api from "../services/api";
const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-users?page=1&limit=10&search=${search}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setUsers(res.data?.data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }


  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `https://vaultx-user-api.staging-host.com/api/v1/auth/admin/delete-user/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert("User deleted successfully");

      setShowDeleteModal(false);
      setSelectedUserId("");

      getUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }


  };

  useEffect(() => {
    getUsers();
  }, [search, role]);

  return (<div className="users-container">
    {showAddUserModal && (
      <AddUserModal
        token={token}
        getUsers={getUsers}
        onClose={() => setShowAddUserModal(false)}
      />
    )}


    {showDeleteModal && (
      <div className="modal-overlay">
        <div className="delete-modal">
          <h3>Are you sure you want to delete this user?</h3>

          <div className="modal-buttons">
            <button
              className="yes-btn"
              onClick={deleteUser}
            >
              Yes
            </button>

            <button
              className="no-btn"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUserId("");
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="users-header">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="user">User</option>
        <option value="viewer">Viewer</option>
        <option value="cto">CTO</option>
      </select>

      <button
        className="add-user-btn"
        onClick={() => setShowAddUserModal(true)}
      >
        + Add User
      </button>
    </div>

    {/* Users Table */}
    <table className="users-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Role</th>
          <th>Status</th>
          <th>Wallet Address</th>
          <th>Last Activity</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="user-info">
                  <div className="avatar">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <div>{user.name}</div>
                    <small>{user.email}</small>
                  </div>
                </div>
              </td>

              <td>
                <span className="role-badge">
                  {user.role}
                </span>
              </td>

              <td>{user.status || "Active"}</td>

              <td>{user.walletAddress || "--"}</td>

              <td>{user.lastActivity || "--"}</td>

              <td>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "--"}
              </td>

              <td className="action-buttons">
                <button className="edit-btn">
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="no-data">
              No Users Found
            </td>
          </tr>
        )}
      </tbody>
    </table>

    <div className="footer">
      Showing {users.length} users
    </div>
  </div>


  );
};

export default Users;
