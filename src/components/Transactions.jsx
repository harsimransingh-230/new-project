// import { useEffect, useState } from "react";
// import api from "../services/api";
// import axios from "axios";
// import "./Transactions.css";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [walletFilter, setWalletFilter] = useState("all");

//   const [page, setPage] = useState(1);

//   const limit = 10;

//   useEffect(() => {
//     getTransactions();
//   }, []);

//   async function getTransactions() {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await api.get(
//         `/auth/multisig/get-user-transactions?page=1&limit=100`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       let data = res.data.data;

//       if (!Array.isArray(data)) {
//         data = data.transactions || [];
//       }

//       setTransactions(data);
//     } catch (err) {
//       console.log(err);
//       setError("Failed to load transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Wallet List
//   const walletOptions = ["all"];

//   transactions.forEach((tx) => {
//     if (tx.wallet && !walletOptions.includes(tx.wallet)) {
//       walletOptions.push(tx.wallet);
//     }
//   });

//   // Filter Transactions
//   let filtered = transactions;

//   if (activeTab === "pending") {
//     filtered = filtered.filter((tx) => tx.status === "Pending");
//   }

//   if (typeFilter !== "all") {
//     filtered = filtered.filter(
//       (tx) => tx.type.toLowerCase() === typeFilter
//     );
//   }

//   if (walletFilter !== "all") {
//     filtered = filtered.filter(
//       (tx) => tx.wallet === walletFilter
//     );
//   }

//   if (search.trim()) {
//     filtered = filtered.filter((tx) => {
//       const value = search.toLowerCase();

//       return (
//         String(tx.id).includes(value) ||
//         tx.wallet?.toLowerCase().includes(value) ||
//         tx.project?.toLowerCase().includes(value) ||
//         tx.client?.toLowerCase().includes(value) ||
//         tx.status?.toLowerCase().includes(value)
//       );
//     });
//   }

//   const totalTransactions = filtered.length;

//   const incomingCount = filtered.filter(
//     (tx) => tx.type === "Incoming"
//   ).length;

//   const outgoingCount = filtered.filter(
//     (tx) => tx.type === "Outgoing"
//   ).length;

//   const totalVolume = filtered.reduce(
//     (sum, tx) => sum + Number(tx.amount || 0),
//     0
//   );

//   const totalPages = Math.ceil(totalTransactions / limit);

//   const start = (page - 1) * limit;
//   const end = start + limit;

//   const currentTransactions = filtered.slice(start, end);

//   return (
//     <div className="transactions-page">

//       <div className="transactions-hero">
//         <h1>Transactions</h1>
//         <p>Manage all wallet transactions.</p>
//       </div>

//       <div className="transactions-card">

//         {/* Tabs */}

//         <div className="transactions-tabs">

//           <button
//             className={activeTab === "all" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("all");
//               setPage(1);
//             }}
//           >
//             All Transactions
//           </button>

//           <button
//             className={activeTab === "pending" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("pending");
//               setPage(1);
//             }}
//           >
//             Pending
//           </button>

//         </div>

//         {/* Filters */}

//         <div className="transactions-filters">

//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />

//           <select
//             value={typeFilter}
//             onChange={(e) => {
//               setTypeFilter(e.target.value);
//               setPage(1);
//             }}
//           >
//             <option value="all">All Types</option>
//             <option value="incoming">Incoming</option>
//             <option value="outgoing">Outgoing</option>
//           </select>

//           <select
//             value={walletFilter}
//             onChange={(e) => {
//               setWalletFilter(e.target.value);
//               setPage(1);
//             }}
//           >
//             <option value="all">All Wallets</option>

//             {walletOptions
//               .filter((wallet) => wallet !== "all")
//               .map((wallet) => (
//                 <option key={wallet} value={wallet}>
//                   {wallet}
//                 </option>
//               ))}
//           </select>

//         </div>

//         {/* Summary */}

//         <div className="transactions-summary">

//           <div className="summary-card">
//             <h3>{totalTransactions}</h3>
//             <p>Total</p>
//           </div>

//           <div className="summary-card">
//             <h3>{incomingCount}</h3>
//             <p>Incoming</p>
//           </div>

//           <div className="summary-card">
//             <h3>{outgoingCount}</h3>
//             <p>Outgoing</p>
//           </div>

//           <div className="summary-card">
//             <h3>${totalVolume}</h3>
//             <p>Volume</p>
//           </div>

//         </div>

//         {error && <p>{error}</p>}

//         <table className="transactions-table">

//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Wallet</th>
//               <th>Project</th>
//               <th>Client</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>

//             {loading ? (
//               <tr>
//                 <td colSpan="8">Loading...</td>
//               </tr>
//             ) : currentTransactions.length === 0 ? (
//               <tr>
//                 <td colSpan="8">No Transactions Found</td>
//               </tr>
//             ) : (
//               currentTransactions.map((tx) => (
//                 <tr key={tx.id || tx._id}>

//                   <td>{tx.type}</td>

//                   <td>{tx.id || tx._id}</td>

//                   <td>
//                     {new Date(
//                       tx.createdAt || tx.date
//                     ).toLocaleString()}
//                   </td>
// {/* 
//                   <td>{tx.wallet}</td>

//                   <td>{tx.project || "-"}</td>

//                   <td>{tx.client || "-"}</td> */}


// <td>
//   {typeof tx.wallet === "object"
//     ? tx.wallet?.multisigAddress || "-"
//     : tx.wallet || "-"}
// </td>

// <td>
//   {typeof tx.wallet === "object"
//     ? tx.wallet?.projectName || "-"
//     : tx.project || "-"}
// </td>

// <td>
//   {typeof tx.wallet === "object"
//     ? tx.wallet?.clientName || "-"
//     : tx.client || "-"}
// </td>
// <td>
//                     {tx.amount >= 0 ? "+" : "-"}$
//                     {Math.abs(tx.amount)}
//                   </td>

//                   <td>{tx.status}</td>

//                 </tr>
//               ))
//             )}

//           </tbody>

//         </table>

//         <div className="transactions-footer">

//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//           >
//             Previous
//           </button>

//           <span>
//             {page} / {totalPages || 1}
//           </span>

//           <button
//             disabled={page === totalPages || totalPages === 0}
//             onClick={() => setPage(page + 1)}
//           >
//             Next
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Transactions;

















import { useEffect, useState } from "react";
import api from "../services/api";
import "./Transactions.css";

// Wallet can be either a plain string or an object like
// { multisigAddress, projectName, clientName }. These helpers
// normalize access so the rest of the component doesn't need to care.
function getWalletLabel(wallet) {
  if (!wallet) return "-";
  if (typeof wallet === "object") return wallet.multisigAddress || "-";
  return wallet;
}

function getWalletProject(tx) {
  return typeof tx.wallet === "object"
    ? tx.wallet?.projectName || "-"
    : tx.project || "-";
}

function getWalletClient(tx) {
  return typeof tx.wallet === "object"
    ? tx.wallet?.clientName || "-"
    : tx.client || "-";
}

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [walletFilter, setWalletFilter] = useState("all");

  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await api.get(
        `/auth/multisig/get-user-transactions?page=1&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = res.data.data;

      if (!Array.isArray(data)) {
        data = data.transactions || [];
      }

      setTransactions(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }

  // Wallet List (dedupe by the display label, not the raw value,
  // since wallet may be an object)
  const walletOptions = ["all"];
  const seenWallets = new Set();

  transactions.forEach((tx) => {
    const label = getWalletLabel(tx.wallet);
    if (label !== "-" && !seenWallets.has(label)) {
      seenWallets.add(label);
      walletOptions.push(label);
    }
  });

  // Filter Transactions
  let filtered = transactions;

  if (activeTab === "pending") {
    filtered = filtered.filter((tx) => tx.status === "Pending");
  }

  if (typeFilter !== "all") {
    filtered = filtered.filter(
      (tx) => tx.type?.toLowerCase() === typeFilter
    );
  }

  if (walletFilter !== "all") {
    filtered = filtered.filter(
      (tx) => getWalletLabel(tx.wallet) === walletFilter
    );
  }

  if (search.trim()) {
    filtered = filtered.filter((tx) => {
      const value = search.toLowerCase();

      return (
        String(tx.id ?? tx._id ?? "").includes(value) ||
        getWalletLabel(tx.wallet)?.toLowerCase().includes(value) ||
        getWalletProject(tx)?.toLowerCase().includes(value) ||
        getWalletClient(tx)?.toLowerCase().includes(value) ||
        tx.status?.toLowerCase().includes(value)
      );
    });
  }

  const totalTransactions = filtered.length;

  const incomingCount = filtered.filter(
    (tx) => tx.type === "Incoming"
  ).length;

  const outgoingCount = filtered.filter(
    (tx) => tx.type === "Outgoing"
  ).length;

  const totalVolume = filtered.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  const totalPages = Math.ceil(totalTransactions / limit);

  // Keep page in range if filters/data shrink the result set
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const start = (page - 1) * limit;
  const end = start + limit;

  const currentTransactions = filtered.slice(start, end);

  return (
    <div className="transactions-page">
      <div className="transactions-hero">
        <h1>Transactions</h1>
        <p>Manage all wallet transactions.</p>
      </div>

      <div className="transactions-card">
        {/* Tabs */}

        <div className="transactions-tabs">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}
          >
            All Transactions
          </button>

          <button
            className={activeTab === "pending" ? "active" : ""}
            onClick={() => {
              setActiveTab("pending");
              setPage(1);
            }}
          >
            Pending
          </button>
        </div>

        {/* Filters */}

        <div className="transactions-filters">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Types</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>

          <select
            value={walletFilter}
            onChange={(e) => {
              setWalletFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Wallets</option>

            {walletOptions
              .filter((wallet) => wallet !== "all")
              .map((wallet) => (
                <option key={wallet} value={wallet}>
                  {wallet}
                </option>
              ))}
          </select>
        </div>

        {/* Summary */}

        <div className="transactions-summary">
          <div className="summary-card">
            <h3>{totalTransactions}</h3>
            <p>Total</p>
          </div>

          <div className="summary-card">
            <h3>{incomingCount}</h3>
            <p>Incoming</p>
          </div>

          <div className="summary-card">
            <h3>{outgoingCount}</h3>
            <p>Outgoing</p>
          </div>

          <div className="summary-card">
            <h3>${totalVolume}</h3>
            <p>Volume</p>
          </div>
        </div>

        {error && <p>{error}</p>}

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>ID</th>
              <th>Date</th>
              <th>Wallet</th>
              <th>Project</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="8">No Transactions Found</td>
              </tr>
            ) : (
              currentTransactions.map((tx) => {
                const amount = Number(tx.amount || 0);

                return (
                  <tr key={tx.id || tx._id}>
                    <td>{tx.type}</td>

                    <td>{tx.id || tx._id}</td>

                    <td>
                      {tx.createdAt || tx.date
                        ? new Date(tx.createdAt || tx.date).toLocaleString()
                        : "-"}
                    </td>

                    <td>{getWalletLabel(tx.wallet)}</td>

                    <td>{getWalletProject(tx)}</td>

                    <td>{getWalletClient(tx)}</td>

                    <td>
                      {amount >= 0 ? "+" : "-"}$
                      {Math.abs(amount)}
                    </td>

                    <td>{tx.status}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="transactions-footer">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>
            {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;