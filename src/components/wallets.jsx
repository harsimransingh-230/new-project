// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./wallets.css";
// import api from "../services/api";


// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getProjects = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const { data } = await axios.get(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/projects?page=1&limit=10",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(data);

//       setProjects(data?.data?.projects || []);
//     } catch (err) {
//       console.log(err.response?.data || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProjects();
//   }, []);

//   const activeProjects = projects.filter(
//     (item) => item.status?.toLowerCase() === "active"
//   ).length;

//   return (
//     <div className="dashboard">

//       {/* Header */}

//       <div className="header">
//         <div>
//           <h1>Wallet Dashboard</h1>
//           <p>
//             Monitor and manage all multisig wallets across your
//             organization
//           </p>
//         </div>

//         <button className="connect-btn">
//           Connect
//         </button>
//       </div>

//       {/* Cards */}

//       <div className="stats-grid">
//         <div className="stat-card">
//           <h2>{projects.length}</h2>
//           <span>Total Wallets</span>
//         </div>

//         <div className="stat-card">
//           <h2>$0</h2>
//           <span>Total Balance</span>
//         </div>

//         <div className="stat-card">
//           <h2>0</h2>
//           <span>Pending Approvals</span>
//         </div>

//         <div className="stat-card">
//           <h2>{activeProjects}</h2>
//           <span>Active Signers</span>
//         </div>
//       </div>

//       {/* Projects */}

//       <div className="project-section">

//         <div className="project-header">
//           <div>
//             <h2>Projects Overview</h2>
//             <p>Manage and monitor all projects</p>
//           </div>

//           <button className="wallet-btn">
//             + Create New Wallet
//           </button>
//         </div>

//         {loading ? (
//           <h3 style={{ padding: 30 }}>Loading...</h3>
//         ) : (
//           <div className="table-container">

//             <table>

//               <thead>
//                 <tr>
//                   <th>Project Name</th>
//                   <th>Client Name</th>
//                   <th>Multisig Address</th>
//                   <th>Threshold</th>
//                   <th>Total Incoming</th>
//                   <th>Total Outgoing</th>
//                   <th>Balance</th>
//                   <th>Status</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {projects.map((item) => (
//                   <tr key={item._id}>

//                     <td>{item.projectName}</td>

//                     <td>{item.clientName}</td>

//                     <td>{item.multisigAddress}</td>

//                     <td>
//                       <span className="badge">
//                         {item.threshold}
//                       </span>
//                     </td>

//                     <td className="green">
//                       {item.totalIncoming || "+$0"}
//                     </td>

//                     <td>
//                       {item.totalOutgoing || "-$0"}
//                     </td>

//                     <td>
//                       {item.currentBalance || "$0"}
//                     </td>

//                     <td>
//                       <span className="status">
//                         {item.status}
//                       </span>
//                     </td>

//                     <td>
//                       {new Date(
//                         item.createdAt
//                       ).toLocaleDateString()}
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default wallets;


import { useEffect, useState } from "react";
import api from "../services/api";
import "./wallets.css";

function Wallets() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      setLoading(true);

      const res = await api.get("/auth/projects?page=1&limit=10");

      const projectList = res.data?.data?.projects || [];
      setProjects(projectList);
    } catch (error) {
      console.log(error.response?.data || error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const activeProjects = projects.filter(
    (project) => project.status?.toLowerCase() === "active"
  ).length;

  return (
    <div className="dashboard">
      {/* Header */}

      <div className="header">
        <div>
          <h1>Wallet Dashboard</h1>
          <p>Monitor and manage all multisig wallets across your organization.</p>
        </div>

        <button className="connect-btn">Connect</button>
      </div>

      {/* Summary Cards */}

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{projects.length}</h2>
          <span>Total Wallets</span>
        </div>

        <div className="stat-card">
          <h2>$0</h2>
          <span>Total Balance</span>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <span>Pending Approvals</span>
        </div>

        <div className="stat-card">
          <h2>{activeProjects}</h2>
          <span>Active Wallets</span>
        </div>
      </div>

      {/* Projects */}

      <div className="project-section">
        <div className="project-header">
          <div>
            <h2>Projects Overview</h2>
            <p>Manage and monitor all wallets.</p>
          </div>

          <button className="wallet-btn">
            + Create New Wallet
          </button>
        </div>

        {loading ? (
          <h3 style={{ padding: "30px" }}>Loading...</h3>
        ) : projects.length === 0 ? (
          <h3 style={{ padding: "30px" }}>No wallets found.</h3>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Client Name</th>
                  <th>Multisig Address</th>
                  <th>Threshold</th>
                  <th>Total Incoming</th>
                  <th>Total Outgoing</th>
                  <th>Current Balance</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>{project.projectName || "-"}</td>

                    <td>{project.clientName || "-"}</td>

                    <td>{project.multisigAddress || "-"}</td>

                    <td>
                      <span className="badge">
                        {project.threshold || "-"}
                      </span>
                    </td>

                    <td className="green">
                      {project.totalIncoming || "$0"}
                    </td>

                    <td>{project.totalOutgoing || "$0"}</td>

                    <td>{project.currentBalance || "$0"}</td>

                    <td>
                      <span
                        className={
                          project.status?.toLowerCase() === "active"
                            ? "status active"
                            : "status"
                        }
                      >
                        {project.status || "-"}
                      </span>
                    </td>

                    <td>
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallets;