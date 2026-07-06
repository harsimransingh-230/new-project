// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./PendingApprovals.css";

// const PendingApprovals = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("withdraw");
//   const [loading, setLoading] = useState(false);


// const [withdraws, setWithdraws] = useState([]);
// const [updates, setUpdates] = useState([]);
// const [signers, setSigners] = useState([]);
// const [profile, setProfile] = useState({});
// const [activeTab, setActiveTab] = useState("withdraw");
// const [loading, setLoading] = useState(false);




//   useEffect(() => {
//     getPendingTransactions();
//   }, []);

//   const getPendingTransactions = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get(
//         "/auth/multisig/get-pending-transactions?page=1&limit=10"
//       );

//       const data =
//         res.data?.data?.transactions ||
//         res.data?.data ||
//         res.data?.transactions ||
//         [];

//       setTransactions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.log(error);
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };
     





// const getPendingWithdraws = async () => {
//   try {
//     const res = await api.get(
//       "/auth/multisig/get-pending-transactions?page=1&limit=10"
//     );

//     setWithdraws(
//       res.data?.data?.transactions ||
//       res.data?.data ||
//       []
//     );
//   } catch (err) {
//     console.log(err);
//     setWithdraws([]);
//   }
// };




// const getPendingUpdates = async () => {
//   try {
//     const res = await api.get(
//       "/auth/multisig/get-pending-multisig-config-updates?page=1&limit=10"
//     );

//     setUpdates(
//       res.data?.data?.updates ||
//       res.data?.data ||
//       []
//     );
//   } catch (err) {
//     console.log(err);
//     setUpdates([]);
//   }
// };



// const getSigners = async () => {
//   try {
//     const res = await api.get(
//       "/auth/projects/signers?page=1&limit=1000"
//     );

//     setSigners(
//       res.data?.data?.signers ||
//       res.data?.data ||
//       []
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };



//   useEffect(() => {
//   getPendingWithdraws();
//   getProfile();
// }, []);


// const handleWithdraw = () => {
//   setActiveTab("withdraw");
//   getPendingWithdraws();
// };


// const handleUpdate = async () => {
//   setActiveTab("update");
//   setLoading(true);

//   await Promise.all([
//     getPendingUpdates(),
//     getSigners(),
//     getProfile(),
//   ]);

//   setLoading(false);
// };








//   const filteredTransactions = transactions.filter((item) => {
//     const value = search.toLowerCase();

//     return (
//       item?.projectName?.toLowerCase().includes(value) ||
//       item?.recipient?.toLowerCase().includes(value) ||
//       item?.chain?.toLowerCase().includes(value)
//     );
//   });

//   return (
//     <div className="pending-page">

//       <div className="page-header">
//         <h2>Pending Approvals</h2>
//         <p>
//           Review and approve pending transactions and config updates requiring
//           your signature.
//         </p>
//       </div>

//       <div className="tabs">
//         {/* <button
//           className={activeTab === "withdraw" ? "active" : ""}
//           onClick={() => setActiveTab("withdraw")}
//         >
//           Withdraw
//         </button>

//         <button
//           className={activeTab === "update" ? "active" : ""}
//           onClick={() => setActiveTab("update")}
//         >
//           Update
//         </button> */}




// <button
//   className={activeTab === "withdraw" ? "active" : ""}
//   onClick={handleWithdraw}
// >
//   Withdraw
// </button>

// <button
//   className={activeTab === "update" ? "active" : ""}
//   onClick={handleUpdate}
// >
//   Update
// </button>





//       </div>

//       <div className="table-card">

//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search pending approvals..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
// {/* 
//         <table>
//           <thead>
//             <tr>
//               <th>S.NO</th>
//               <th>PROJECT NAME</th>
//               <th>CHAIN</th>
//               <th>AMOUNT</th>
//               <th>RECIPIENT</th>
//               <th>TRANSACTION STATUS</th>
//               <th>CREATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="8" className="empty">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredTransactions.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="empty">
//                   No pending approvals found.
//                 </td>
//               </tr>
//             ) : (
//               filteredTransactions.map((item, index) => (
//                 <tr key={item._id || index}>
//                   <td>{index + 1}</td>

//                   <td>{item.projectName || "-"}</td>

//                   <td>{item.chain || "-"}</td>

//                   <td>{item.amount || "-"}</td>

//                   <td>{item.recipient || "-"}</td>

//                   <td>
//                     <span className="status">
//                       {item.status || "Pending"}
//                     </span>
//                   </td>

//                   <td>
//                     {item.createdAt
//                       ? new Date(item.createdAt).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   <td>
//                     <button className="approve-btn">
//                       Approve
//                     </button>

//                     <button className="reject-btn">
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>

//         </table> */}












// <table>

// <thead>
// <tr>
// <th>S.No</th>
// <th>Project</th>
// <th>Update Type</th>
// <th>Email</th>
// <th>New Threshold</th>
// <th>Signers To Remove</th>
// <th>Date & Time</th>
// <th>Status</th>
// <th>Actions</th>
// </tr>
// </thead>

// <tbody>

// {updates.map((item,index)=>(

// <tr key={item._id}>

// <td>{index+1}</td>

// <td>{item.projectName}</td>

// <td>{item.updateType}</td>

// <td>{profile.email}</td>

// <td>{item.newThreshold}</td>

// <td>
// {item.signersToRemove?.map((id)=>{

// const signer=signers.find(s=>s._id===id);

// return(
// <div key={id}>
// {signer?.name}
// <br/>
// {signer?.walletAddress}
// </div>
// );

// })}
// </td>

// <td>
// {new Date(item.createdAt).toLocaleString()}
// </td>

// <td>
// <span className="status">
// {item.status}
// </span>
// </td>

// <td>

// <button className="approve-btn">
// Approve
// </button>

// <button className="reject-btn">
// Reject
// </button>

// </td>

// </tr>

// ))}

// </tbody>

// </table>
        


//       </div>

//     </div>
//   );
// };

// export default PendingApprovals;



import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import "./PendingApprovals.css";

const PendingApprovals = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [signers, setSigners] = useState([]);
  const [profile, setProfile] = useState({});

  const [search, setSearch] = useState("");

  
const [activeTab, setActiveTab] = useState("withdraw");
const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWithdrawData();
  }, []);

  // ================= Withdraw =================

  const getPendingWithdraws = async () => {
    try {
      const res = await api.get(
        "/auth/multisig/get-pending-transactions?page=1&limit=10"
      );

      const data =
        res.data?.data?.transactions ||
        res.data?.data ||
        [];

      setWithdraws(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setWithdraws([]);
    }
  };

  // ================= Updates =================

  const getPendingUpdates = async () => {
    try {
      const res = await api.get(
        "/auth/multisig/get-pending-multisig-config-updates?page=1&limit=10"
      );

      const data =
        res.data?.data?.updates ||
        res.data?.data ||
        [];
console.log(res.data);
      setUpdates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setUpdates([]);
    }
  };

  // ================= Signers =================

  const getSigners = async () => {
    try {
      const res = await api.get(
        "/auth/projects/signers?page=1&limit=1000"
      );

      const data =
        res.data?.data?.signers ||
        res.data?.data ||
        [];

      setSigners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setSigners([]);
    }
  };

  // ================= Profile =================

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/get-profile");

      setProfile(
        res.data?.data ||
        res.data?.profile ||
        {}
      );
    } catch (err) {
      console.log(err);
      setProfile({});
    }
  };

  // ================= Load Functions =================

  const loadWithdrawData = async () => {
    setLoading(true);

    await getPendingWithdraws();

    setLoading(false);
  };

  const loadUpdateData = async () => {
    setLoading(true);

    await Promise.all([
      getPendingUpdates(),
      getSigners(),
      getProfile(),
    ]);

    setLoading(false);
  };

  // ================= Tab Click =================

  const handleWithdraw = () => {
    setActiveTab("withdraw");
    loadWithdrawData();
  };

  const handleUpdate = () => {
    setActiveTab("update");
    loadUpdateData();
  };

  // ================= Search =================

  const filteredWithdraws = withdraws.filter((item) => {
    const value = search.toLowerCase();

    return (
      item?.projectName?.toLowerCase().includes(value) ||
      item?.recipient?.toLowerCase().includes(value) ||
      item?.chain?.toLowerCase().includes(value)
    );
  });

  const filteredUpdates = updates.filter((item) => {
    const value = search.toLowerCase();

    return (
      item?.projectName?.toLowerCase().includes(value) ||
      item?.updateType?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="pending-page">
      <div className="page-header">
        <h2>Pending Approvals</h2>

        <p>
          Review and approve pending transactions and config updates requiring
          your signature.
        </p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "withdraw" ? "active" : ""}
          onClick={handleWithdraw}
        >
          Withdraw
        </button>

        <button
          className={activeTab === "update" ? "active" : ""}
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>

      <div className="table-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {activeTab === "withdraw" ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project</th>
                <th>Chain</th>
                <th>Amount</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              ) : filteredWithdraws.length === 0 ? (
                <tr>
                  <td colSpan="8">No pending transactions.</td>
                </tr>
              ) : (
                filteredWithdraws.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>

                    <td>{item.projectName}</td>

                    <td>{item.chain}</td>

                    <td>{item.amount}</td>

                    <td>{item.recipient}</td>

                    <td>
                      <span className="status">
                        {item.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>

                    <td>
                      <button className="approve-btn">
                        Approve
                      </button>

                      <button className="reject-btn">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project</th>
                <th>Update Type</th>
                <th>Email</th>
                <th>New Threshold</th>
                <th>Signers To Remove</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Loading...</td>
                </tr>
              ) : filteredUpdates.length === 0 ? (
                <tr>
                  <td colSpan="9">No pending updates.</td>
                </tr>
              ) : (
                filteredUpdates.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>

                    <td>{item.projectName}</td>

                    <td>{item.updateType}</td>

                    <td>{profile?.email || "-"}</td>

                    <td>{item.newThreshold}</td>

                    <td>
                      {item.signersToRemove?.length ? (
                        item.signersToRemove.map((id) => {
                          const signer = signers.find(
                            (s) => s._id === id
                          );

                          return (
                            <div key={id}>
                              <strong>{signer?.name || "-"}</strong>
                              <br />
                              {signer?.walletAddress || "-"}
                              <br />
                              <br />
                            </div>
                          );
                        })
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>

                    <td>
                      <span className="status">
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button className="approve-btn">
                        Approve
                      </button>

                      <button className="reject-btn">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;