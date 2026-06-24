// import { Routes, Route } from "react-router-dom";
// import user from "./components/Users";
// import Login from "./components/Login";
// import ForgotPassword from "./components/ForgotPassword";
// import Otp from "./components/Otp";
// import Dashboard from "./components/Dashboard";
// import Sidebar from "./components/Sidebar";
// import UserManagement from "./components/UserManagement";

// function App() {
//   return (
//     <Routes>

//       <Route
//         path="/"
//         element={<Login />}
//       />

//       <Route
//         path="/forgot-password"
//         element={<ForgotPassword />}
//       />

//       <Route
//         path="/otp"
//         element={<Otp />}
//       />

//       <Route
//         path="/dashboard"
//         element={<Dashboard />}
//       />

//       <Route
//         path="/usermanagement"
//         element={<UserManagement />}
//       />

//       <Route
//         path="/sidebar"
//         element={<Sidebar />}
//       />


// <Route
// path="/users"
//         element={<Users />}
// />

//     </Routes>
//   );
// }

// export default App;





import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Otp from "./components/Otp";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import UserManagement from "./components/UserManagement";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/otp"
        element={<Otp />}
      />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/usermanagement"
        element={
          <Layout>
            <UserManagement />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;