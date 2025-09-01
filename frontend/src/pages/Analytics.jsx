import React, { useEffect, useState } from "react";

import { getAnalytics } from "../services/analyticsService";
import styles from '../styles/Analytics.module.css';


const Analytics = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getAnalytics();
      setData(res || {});
    })();
  }, []);

  return (
    <div>
     
      <div className={styles.container}>
        <h2>System Analytics</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Total Roles: {data.rolesCount}</p>
        <p>Active Users (7 days): {data.activeUsers}</p>
      </div>
    </div>
  );
};

export default Analytics;
