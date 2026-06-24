// import { useNavigate } from "react-router-dom";
// import "./sidebar.css";

// const Sidebar = () => {

//   const navigate = useNavigate();

//   return (
//     <div className="sidebar">

//       <h1 className="logo">
//         VaultX
//       </h1>

//       <button
//         className="menu-btn"
//         onClick={() => navigate("/dashboard")}
//       >
//         Dashboard
//       </button>

//       <button
//         className="menu-btn"
//         onClick={() => navigate("/usermanagement")}
//       >
//         User Managementx
//       </button>

//     </div>
//   );
// };

// export default Sidebar;




import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowLeftRight,
  Clock3,
  Settings,
} from "lucide-react";

import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Wallets",
      path: "/wallets",
      icon: <Wallet size={20} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    {
      name: "Pending Approvals",
      path: "/approvals",
      icon: <Clock3 size={20} />,
    },
    {
      name: "User Management",
      path: "/usermanagement",
      icon: <Users size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">🛡️</div>
        <div>
          <h2>VaultX</h2>
          <p>Enterprise Edition</p>
        </div>
      </div>

      <div className="menu-list">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className={`menu-btn ${
              location.pathname === menu.path ? "active" : ""
            }`}
            onClick={() => navigate(menu.path)}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;