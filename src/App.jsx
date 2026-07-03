// // // // // // import { Routes, Route } from "react-router-dom";
// // // // // // import user from "./components/Users";
// // // // // // import Login from "./components/Login";
// // // // // // import ForgotPassword from "./components/ForgotPassword";
// // // // // // import Otp from "./components/Otp";
// // // // // // import Dashboard from "./components/Dashboard";
// // // // // // import Sidebar from "./components/Sidebar";
// // // // // // import UserManagement from "./components/UserManagement";

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <Routes>

// // // // // //       <Route
// // // // // //         path="/"
// // // // // //         element={<Login />}
// // // // // //       />

// // // // // //       <Route
// // // // // //         path="/forgot-password"
// // // // // //         element={<ForgotPassword />}
// // // // // //       />

// // // // // //       <Route
// // // // // //         path="/otp"
// // // // // //         element={<Otp />}
// // // // // //       />

// // // // // //       <Route
// // // // // //         path="/dashboard"
// // // // // //         element={<Dashboard />}
// // // // // //       />

// // // // // //       <Route
// // // // // //         path="/usermanagement"
// // // // // //         element={<UserManagement />}
// // // // // //       />

// // // // // //       <Route
// // // // // //         path="/sidebar"
// // // // // //         element={<Sidebar />}
// // // // // //       />


// // // // // // <Route
// // // // // // path="/users"
// // // // // //         element={<Users />}
// // // // // // />

// // // // // //     </Routes>
// // // // // //   );
// // // // // // }

// // // // // // export default App;





// // // // import { Routes, Route } from "react-router-dom";

// // // // import Login from "./components/Login";
// // // // import ForgotPassword from "./components/ForgotPassword";
// // // // import Otp from "./components/Otp";
// // // // import Dashboard from "./components/Dashboard";
// // // // import Sidebar from "./components/Sidebar";
// // // // import profileSettings from "./components/ProfileSettings";
// // // // import UserManagement from "./components/UserManagement";

// // // // function Layout({ children }) {
// // // //   return (
// // // //     <div style={{ display: "flex" }}>
// // // //       <Sidebar />

// // // //       <div style={{ flex: 1 }}>
// // // //         {children}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function App() {
// // // //   return (
// // // //     <Routes>
// // // //       <Route path="/" element={<Login />} />

// // // //       <Route
// // // //         path="/forgot-password"
// // // //         element={<ForgotPassword />}
// // // //       />

// // // //       <Route
// // // //         path="/otp"
// // // //         element={<Otp />}
// // // //       />

// // // //       <Route
// // // //         path="/dashboard"
// // // //         element={
// // // //           <Layout>
// // // //             <Dashboard />
// // // //           </Layout>
// // // //         }
// // // //       />

// // // //       <Route
// // // //         path="/usermanagement"
// // // //         element={
// // // //           <Layout>
// // // //             <UserManagement />
// // // //           </Layout>
// // // //         }
// // // //       />

// // // //     <Route
// // // //         path="/settings"
// // // //         element={
// // // //           <Layout>
// // // //             <ProfileSettings />
// // // //           </Layout>
// // // //         }
// // // //       />


// // // //     </Routes>
// // // //   );
// // // // }

// // // // export default App;



// // // import { Routes, Route } from "react-router-dom";

// // // import Login from "./components/Login";
// // // import ForgotPassword from "./components/ForgotPassword";
// // // import Otp from "./components/Otp";
// // // import Dashboard from "./components/Dashboard";
// // // import Sidebar from "./components/Sidebar";
// // // import ProfileSettings from "./components/ProfileSettings";
// // // import UserManagement from "./components/UserManagement";

// // // function Layout({ children }) {
// // //   return (
// // //     <div style={{ display: "flex", minHeight: "100vh" }}>
// // //       <Sidebar />

// // //       <div
// // //         style={{
// // //           flex: 1,
// // //           background: "#f8fafc",
// // //           overflowY: "auto",
// // //         }}
// // //       >
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function App() {
// // //   return (
// // //     <Routes>
// // //       <Route path="/" element={<Login />} />

// // //       <Route
// // //         path="/forgot-password"
// // //         element={<ForgotPassword />}
// // //       />

// // //       <Route
// // //         path="/otp"
// // //         element={<Otp />}
// // //       />

// // //       <Route
// // //         path="/dashboard"
// // //         element={
// // //           <Layout>
// // //             <Dashboard />
// // //           </Layout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/usermanagement"
// // //         element={
// // //           <Layout>
// // //             <UserManagement />
// // //           </Layout>
// // //         }
// // //       />

// // //       <Route
// // //         path="/settings"
// // //         element={
// // //           <Layout>
// // //             <ProfileSettings />
// // //           </Layout>
// // //         }
// // //       />
// // //     </Routes>
// // //   );
// // // }

// // // export default App;

// // import { Routes, Route, Navigate } from "react-router-dom";

// // import Login from "./components/Login";
// // import ForgotPassword from "./components/ForgotPassword";
// // import Otp from "./components/Otp";
// // import Dashboard from "./components/Dashboard";
// // import Sidebar from "./components/Sidebar";
// // import ProfileSettings from "./components/ProfileSettings";
// // import UserManagement from "./components/UserManagement";

// // function Layout({ children }) {
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         minHeight: "100vh",
// //         background: "#f8fafc",
// //       }}
// //     >
// //       <Sidebar />

// //       <main
// //         style={{
// //           flex: 1,
// //           overflowY: "auto",
// //           padding: "0",
// //         }}
// //       >
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <Routes>
// //       {/* Authentication Routes */}
// //       <Route path="/" element={<Login />} />

// //       <Route
// //         path="/forgot-password"
// //         element={<ForgotPassword />}
// //       />

// //       <Route
// //         path="/otp"
// //         element={<Otp />}
// //       />

// //       {/* Dashboard */}
// //       <Route
// //         path="/dashboard"
// //         element={
// //           <Layout>
// //             <Dashboard />
// //           </Layout>
// //         }
// //       />

// //       {/* User Management */}
// //       <Route
// //         path="/usermanagement"
// //         element={
// //           <Layout>
// //             <UserManagement />
// //           </Layout>
// //         }
// //       />

// //       {/* Profile Settings */}
// //       <Route
// //         path="/settings"
// //         element={
// //           <Layout>
// //             <ProfileSettings />
// //           </Layout>
// //         }
// //       />

// //       {/* Fallback Route */}
// //       <Route
// //         path="*"
// //         element={<Navigate to="/" replace />}
// //       />
// //     </Routes>
// //   );
// // }

// // export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./components/Login";
// import ForgotPassword from "./components/ForgotPassword";
// import Otp from "./components/Otp";
// import Dashboard from "./components/Dashboard";
// import SideBar from "./components/Sidebar";
// import ProfileSettings from "./components/ProfileSettings";
// import UserManagement from "./components/UserManagement";
// // import Wallets from "./components/wallets";

// function Layout({ children }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         background: "#f8fafc",
//       }}
//     >
//       <Sidebar />

//       <main
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: 0,
//           background: "#f8fafc",
//         }}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Authentication Routes */}
//         <Route path="/" element={<Login />} />

//         <Route
//           path="/forgot-password"
//           element={<ForgotPassword />}
//         />

//         <Route
//           path="/otp"
//           element={<Otp />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           }
//         />

//         {/* Wallets
//         <Route
//           path="/wallets"
//           element={
//             <Layout>
//               <Wallets />
//             </Layout>
//           }
//         /> */}

//         {/* User Management */}
//         <Route
//           path="/usermanagement"
//           element={
//             <Layout>
//               <UserManagement />
//             </Layout>
//           }
//         />

//         {/* Profile Settings */}
//         <Route
//           path="/settings"
//           element={
//             <Layout>
//               <ProfileSettings />
//             </Layout>
//           }
//         />

//         {/* Fallback Route */}
//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />
//       </Routes>

//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="light"
//       />
//     </>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Otp from "./components/Otp";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ProfileSettings from "./components/ProfileSettings";
import UserManagement from "./components/UserManagement";
import Transactions from "./components/Transactions";
// import Wallets from "./components/Wallets";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 0,
          background: "#f8fafc",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <>
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
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />

        {/* Uncomment when Wallets component exists
        <Route
          path="/wallets"
          element={
            <Layout>
              <Wallets />
            </Layout>
          }
        />
        */}

        <Route
          path="/usermanagement"
          element={
            <Layout>
              <UserManagement />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <ProfileSettings />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;