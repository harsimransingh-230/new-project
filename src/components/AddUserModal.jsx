import { useState } from "react";
import "./AddUserModal.css";

const AddUserModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);


    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-user-modal">

        <div className="modal-header">
          <h2>Add New User</h2>
        </div>

        <div className="modal-body">

          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Role <span className="required">*</span>
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="PROJECT_MANAGER">
                Project Manager
              </option>

            <option value="EFS">
                EFS
            </option>
              <option value="VIEWER">
                Viewer
              </option>
              <option value="CTO">
                CTO
              </option>
              <option value="TEAM_LEAD">
                Team Lead
              </option>
            </select>
          </div>

        </div>

        <div className="modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Add User
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddUserModal;