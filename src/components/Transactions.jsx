import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import "./Transactions.css";

function getWalletLabel(wallet) {
  if (!wallet) return "-";
  if (typeof wallet === "object") {
    const label =
      wallet.multisigAddress ??
      wallet.multisig_address ??
      wallet.id ??
      wallet.projectName ??
      wallet.clientName;
    return label ? String(label) : "-";
  }
  return String(wallet);
}



function normalizeDisplay(value) {
  if (value == null) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(String).join(", ") || "-";

  if (typeof value === "object") {
    if (value.projectName) return String(value.projectName);
    if (value.clientName) return String(value.clientName);
    if (value.name) return String(value.name);
    if (value.title) return String(value.title);
    if (value.id) return String(value.id);
    if (value.multisigAddress) return String(value.multisigAddress);

    const primitiveValue = Object.values(value).find(
      (item) => typeof item === "string" || typeof item === "number"
    );
    return primitiveValue != null ? String(primitiveValue) : "-";
  }

  return String(value);
}

function getWalletProject(tx) {
  if (typeof tx.wallet === "object") {
    return normalizeDisplay(
      tx.wallet?.projectName ?? tx.wallet?.project ?? tx.project ?? tx.wallet
    );
  }
  return normalizeDisplay(tx.project ?? tx.wallet);
}

function getWalletClient(tx) {
  if (typeof tx.wallet === "object") {
    return normalizeDisplay(
      tx.wallet?.clientName ?? tx.wallet?.client ?? tx.client ?? tx.wallet
    );
  }
  return normalizeDisplay(tx.client ?? tx.wallet);
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

  const normalizeTransactions = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.transactions)) return payload.transactions;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.data?.transactions)) return payload.data.transactions;
    if (Array.isArray(payload.data?.items)) return payload.data.items;
    if (Array.isArray(payload.results)) return payload.results;
    return [];
  };

  async function getTransactions() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await api.get("/auth/multisig/get-user-transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 100,
        },
      });

console.log(res.data);
      const payload = res.data?.data ?? res.data;
      const data = normalizeTransactions(payload);

      if (data.length === 0 && res.data) {
        console.log("Transactions payload:", res.data);     
      }
 
      setTransactions(data);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || err.message || "Failed to load transactions.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }
  const walletOptions = ["all"];
  const seenWallets = new Set();

  transactions.forEach((tx) => {
    const label = getWalletLabel(tx.wallet);
    if (label !== "-" && !seenWallets.has(label)) {
      seenWallets.add(label);
      walletOptions.push(label);
    }
  });

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
      (tx) => String(getWalletLabel(tx.wallet)) === String(walletFilter)
    );
  }

  if (search.trim()) {
    filtered = filtered.filter((tx) => {
      const value = search.toLowerCase();

      return (
        String(tx.id ?? tx._id ?? "").toLowerCase().includes(value) ||
        String(getWalletLabel(tx.wallet)).toLowerCase().includes(value) ||
        String(getWalletProject(tx)).toLowerCase().includes(value) ||
        String(getWalletClient(tx)).toLowerCase().includes(value) ||
        String(tx.status ?? "").toLowerCase().includes(value)
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