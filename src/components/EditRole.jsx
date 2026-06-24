    import { useState } from "react";
    import axios from "axios";
    import api from "../services/api";
    import "./EditRole.css";



    const EditRole = ({ role, onClose, getRoles }) => {
    const [name, setName] = useState(role.name);
    const [description, setDescription] = useState(role.description);
    const [permissions, setPermissions] = useState(role.permissions);

    const token = localStorage.getItem("token");

    const handlePermissionChange = (e) =>
    setPermissions({
        ...permissions,
        [e.target.name]: e.target.checked,
    });


    const updateRole = async (e) => {
    e.preventDefault();
        try {
        await axios.put(`https://vaultx-user-api.staging-host.com/api/v1/auth/admin/update-role/${role.id}`,
            { name, 
                description, 
                permissions 
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        alert("Role Updated Successfully");
        getRoles();
        onClose();
        } catch (error) {
        console.log(error);
        alert("Failed to Update Role");
        }
    };

    return (
        <div className="modal">
        <h2>Edit Role</h2>

        <form onSubmit={updateRole}>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Role Name"
            />

            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            />

        
    <div>
    <input
        type="checkbox"
        checked={permissions.WalletPermission}
        onChange={handlePermissionChange}
        name="WalletPermission"
    />
    <label>Wallet Permission</label>
    </div>

    <div>
    <input
        type="checkbox"
        checked={permissions.TransactionPermission}
        onChange={handlePermissionChange}
        name="TransactionPermission"
    />
    <label>Transaction Permission</label>
    </div>

    <div>
    <input
        type="checkbox"
        checked={permissions.InvoicePermission}
        onChange={handlePermissionChange}
        name="InvoicePermission"
    />
    <label>Invoice Permission</label>
    </div>

    <div>
    <input
        type="checkbox"
        checked={permissions.ReportPermission}
        onChange={handlePermissionChange}
        name="ReportPermission"
    />
    <label>Report Permission</label>
    </div>

    <div>
    <input
        type="checkbox"
        checked={permissions.AuditLogPermission}
        onChange={handlePermissionChange}
        name="AuditLogPermission"
    />
    <label>Audit Log Permission</label>
    </div>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
            Cancel
            </button>
        </form>
        </div>
    );
    };

    export default EditRole;