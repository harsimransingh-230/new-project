import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/projects?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectData =
        res.data?.data?.projects ||
        res.data?.data ||
        [];

      setProjects(projectData);
      setFilteredProjects(projectData);
    } catch (err) {
      console.log(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (item) =>
        item.projectName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.clientName
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredProjects(filtered);
  }, [search, projects]);

  const activeProjects = projects.filter(
    (item) =>
      item.status?.toLowerCase() === "active"
  ).length;

  return (
    <div className="dashboard">
      <div className="main">
        {/* Header */}

        <div className="topbar">
          <div>
            <h1>Dashboard</h1>

            <p>
              Monitor and manage all multisig wallets
              across your organization
            </p>
          </div>

          <button className="connect-btn">
            Connect
          </button>
        </div>

        {/* Cards */}

        <div className="cards">
          <div className="card">
            <h2>{projects.length}</h2>
            <p>Total Wallets</p>
          </div>

          <div className="card">
            <h2>$0</h2>
            <p>Total Balance</p>
          </div>

          <div className="card">
            <h2>0</h2>
            <p>Pending Approvals</p>
          </div>

          <div className="card">
            <h2>{activeProjects}</h2>
            <p>Active Signers</p>
          </div>
        </div>

        {/* Projects Section */}

        <div className="table-box">
          <div className="table-header">
            <div>
              <h2>Projects Overview</h2>

              <p>
                Manage and monitor all projects
              </p>
            </div>

            <button className="create-btn">
              + Create New Wallet
            </button>
          </div>

          {/* Search */}

          <div className="search-box">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* Stats Tabs */}

          <div className="project-tabs">
            <span className="active-tab">
              All Projects ({projects.length})
            </span>

            <span>
              Active ({activeProjects})
            </span>

            <span>Pending (0)</span>
          </div>

          {loading ? (
            <p className="loading">
              Loading Projects...
            </p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>PROJECT NAME</th>
                    <th>CLIENT NAME</th>
                    <th>MULTISIG ADDRESS</th>
                    <th>THRESHOLD</th>
                    <th>TOTAL INCOMING</th>
                    <th>TOTAL OUTGOING</th>
                    <th>STATUS</th>
                    <th>CREATED AT</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.projectName ||
                            "N/A"}
                        </td>

                        <td>
                          {item.clientName ||
                            "N/A"}
                        </td>

                        <td className="address">
                          {item.multisigAddress ||
                            "N/A"}
                        </td>

                        <td>
                          {item.threshold ||
                            "N/A"}
                        </td>

                        <td className="green">
                          {item.totalIncoming ||
                            "+$0"}
                        </td>

                        <td>
                          {item.totalOutgoing ||
                            "-$0"}
                        </td>

                        <td>
                          <span className="status">
                            {item.status ||
                              "ACTIVE"}
                          </span>
                        </td>

                        <td>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="no-data"
                      >
                        No Projects Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;