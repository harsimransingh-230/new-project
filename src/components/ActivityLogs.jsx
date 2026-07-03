// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ActivityLogs.css";
// import api from "../services/api";
// const ActivityLogs = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     getActivityLogs();
//   }, []);

//   const getActivityLogs = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-activity-logs?page=1&limit=10",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  

//       console.log(response.data);

//       setLogs(response.data.data.logs);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="activity-wrapper">
//       <div className="activity-filter">
//         <select>
//           <option>Last 7 Days</option>
//           <option>Last 30 Days</option>
//           <option>Last 90 Days</option>
//         </select>
//       </div>

//       <div className="activity-card">
//         {logs.length > 0 ? (
//           logs.map((log) => (
//             <div className="activity-item" key={log._id}>
//               <div className="activity-left">
//                 <div className="activity-icon">🛡️</div>

//                 <div>
//                   <h4>{log.action}</h4>
//                   <p>
//                     {log.user?.name} ({log.user?.email})
                    
                  
//                                 </p>


//                 </div>
//               </div>

//               <div className="activity-time">
//                 {new Date(log.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))
//         ) : (
//           <h3>No Activity Logs Found</h3>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivityLogs;



import { useEffect, useState } from "react";
import axios from "axios";
import "./ActivityLogs.css";
import api from "../services/api";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getActivityLogs();
  }, []);

  const getActivityLogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://vaultx-user-api.staging-host.com/api/v1/auth/admin/get-activity-logs?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setLogs(response.data.data.logs || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="activity-wrapper">
      <div className="activity-filter">
        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <div className="activity-card">
        {logs.length > 0 ? (
          logs.map((log) => {
            // Show available user details only
            const userName =
              log.user?.name ||
              log.user?.firstName ||
              log.performedBy?.name ||
              log.admin?.name ||
              "Unknown User";

            const userEmail =
              log.user?.email ||
              log.performedBy?.email ||
              log.admin?.email ||
              "";

            return (
              <div className="activity-item" key={log._id}>
                <div className="activity-left">
                  <div className="activity-icon">🛡️</div>

                  <div>
                    <h4>{log.action}</h4>

                    <p>
                      {userName}
                      {userEmail && ` (${userEmail})`}
                    </p>
                  </div>
                </div>

                <div className="activity-time">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Activity Logs Found</h3>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;