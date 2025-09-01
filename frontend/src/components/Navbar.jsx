import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/dashboard">SuperAdmin Panel</Link>
      </div>
      <ul className={styles.links}>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/roles">Roles</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/audit-logs">Audit Logs</Link></li>
      </ul>
      <div className={styles.user}>
        <span>{user?.email}</span>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
