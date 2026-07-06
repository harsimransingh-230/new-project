

// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Wallet,
//   ArrowLeftRight,
//   Clock3,
//   Settings,
//   LogOut,
//   Shield,
// } from "lucide-react";

// import "./sidebar.css";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menus = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: <LayoutDashboard size={18} />,
//     },
//     {
//       name: "wallets",
//       path: "/wallets",
//       icon: <Wallet size={18} />,
//     },
//     {
//       name: "Transactions",
//       path: "/transactions",
//       icon: <ArrowLeftRight size={18} />,
//     },
//     {
//       name: "Pending Approvals",
//       path: "/approvals",
//       icon: <Clock3 size={18} />,
//     },
//     {
//       name: "User Management",
//       path: "/usermanagement",
//       icon: <Users size={18} />,
//     },
//     {
//       name: "Settings",
//       path: "/settings",
//       icon: <Settings size={18} />,
//     },
//   ];

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <aside className="sidebar">
//       {/* Logo */}
//       <div className="logo-section">
//         <div className="logo-circle">
//           <Shield size={24} color="#fff" />
//         </div>

//         <div>
//           <h2>VaultX</h2>
//           <p>Enterprise Edition</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <div className="menu-list">
//         {menus.map((menu) => (
//           <button
//             key={menu.path}
//             className={`menu-btn ${
//               location.pathname === menu.path ? "active" : ""
//             }`}
//             onClick={() => navigate(menu.path)}
//           >
//             {menu.icon}
//             <span>{menu.name}</span>
//           </button>
//         ))}
//       </div>

//       {/* Bottom Section */}
//       <div className="sidebar-bottom">
//         <button className="logout-btn" onClick={logout}>
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>

//         <div className="profile-card">
//           <div className="avatar">A</div>

//           <div>
//             <h4>Admin User</h4>
//             <span className="role">admin</span>
//           </div>
//         </div>
//       </div>
//     </aside>
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
  LogOut,
  Shield,
} from "lucide-react";

import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("name") || "Admin User";
  const userRole = localStorage.getItem("role") || "Admin";

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Wallets",
      path: "/wallets",
      icon: <Wallet size={18} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRight size={18} />,
    },
    {
      name: "Pending Approvals",
      path: "/approvals",
      icon: <Clock3 size={18} />,
    },
    {
      name: "User Management",
      path: "/usermanagement",
      icon: <Users size={18} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-section">
        <div className="logo-circle">
          <Shield size={24} color="#fff" />
        </div>

        <div>
          <h2>VaultX</h2>
          <p>Enterprise Edition</p>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-list">
        {menus.map((menu) => (
          <button
            key={menu.path}
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

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <div
          className="profile-card"
          onClick={() => navigate("/settings")}
          style={{ cursor: "pointer" }}
        >
          <div className="avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>{userName}</h4>
            <span className="role">{userRole}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;