import React from "react";

import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
   
      <div className={styles.container}>
        <h1>Welcome to SuperAdmin Dashboard</h1>
        <p>Use the navigation bar to manage users, roles, analytics, and audit logs.</p>
      </div>
    </div>
  );
};

export default Dashboard;
