import { useState } from "react";
import axios from "axios";
import api from "../services/api";
import "./CreateRole.css";

const CreateRole = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [permissions, setPermissions] = useState({
    WalletPermission: false,
    TransactionPermission: false,
    InvoicePermission: false,
    ReportPermission: false,
    AuditLogPermission: false,
  });

const handleCheckbox = (e) => {
  const name = e.target.name;
  const checked = e.target.checked;

  setPermissions({
    ...permissions,
    [name]: checked,
  });
};


  const handleCreateRole = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/create-role",
        {
          name,
          description,
          permissions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      alert("Role Created");
      onClose();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Role</h2>

        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="checkbox-container">
          <h3>Permissions</h3>

          <label>
            <input
              type="checkbox"
              name="WalletPermission"
              checked={permissions.WalletPermission}
              onChange={handleCheckbox}
            />
            Wallet Permission
          </label>


 <label>
            <input
              type="checkbox"
              name="TransactionPermission"
              checked={permissions.TransactionPermission}
              onChange={handleCheckbox}
            />
             TransactionPermission
          </label>



 <label>
            <input
              type="checkbox"
              name="InvoicePermission"
              checked={permissions.InvoicePermission}
              onChange={handleCheckbox}
            />
             InvoicePermission
          </label>

 <label>
            <input
              type="checkbox"
              name="ReportPermission"
              checked={permissions.ReportPermission}
              onChange={handleCheckbox}
            />
             ReportPermission
          </label>


<label>
            <input
              type="checkbox"
              name="AuditLogPermission"
              checked={permissions.AuditLogPermission}
              onChange={handleCheckbox}
            />
             AuditLogPermission
          </label>

        </div>

        <div className="modal-buttons">
          <button onClick={handleCreateRole}>
            Create
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;




