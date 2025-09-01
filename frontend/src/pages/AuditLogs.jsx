import React, { useEffect, useState, useCallback } from "react";
import { getAuditLogs } from "../services/auditService";
import styles from "../styles/AuditLogs.module.css";

const actionOptions = [
  "", "CREATE_ROLE", "UPDATE_ROLE", "ASSIGN_ROLE", "create_user", "delete_user"
 
];

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    action: "",
    date: ""
  });

  const fetchLogs = useCallback(debounce(async (filtersToUse) => {
    const queryParams = new URLSearchParams();

    if (filtersToUse.userId) queryParams.append("userId", filtersToUse.userId.trim());
    if (filtersToUse.action) queryParams.append("action", filtersToUse.action);
    if (filtersToUse.date) queryParams.append("date", filtersToUse.date);

    const data = await getAuditLogs(queryParams.toString());
    setLogs(data || []);
  }, 500), []);

  useEffect(() => {
    
    fetchLogs(filters);
  }, [filters, fetchLogs]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.container}>
      <h2>Audit Logs</h2>

      <div className={styles.filters} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input
          type="text"
          name="userId"
          placeholder="Filter by User ID"
          value={filters.userId}
          onChange={handleFilterChange}
          className={styles.inputField}
        />

        <select
          name="action"
          value={filters.action}
          onChange={handleFilterChange}
          className={styles.inputField}
          style={{ minWidth: "160px" }}
        >
          {actionOptions.map(act => (
            <option key={act} value={act}>{act === "" ? "-- Filter by Action --" : act}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className={styles.inputField}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Action</th>
            <th>Target</th>
            <th>Details</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>No logs found.</td>
            </tr>
          ) : (
            logs.map((log, idx) => (
              <tr key={idx}>
                <td>{log.actorUserId}</td>
                <td>{log.action}</td>
                <td>{log.targetType} #{log.targetId}</td>
                <td>{JSON.stringify(log.details)}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;
