import React from 'react';

import Navbar from '../components/Navbar.jsx';

import styles from '../styles/Dashboard.module.css';



export default function Layout({ children }) {
return (


<div className={styles.main}>
<Navbar />
<div className={styles.content}>{children}</div>
</div>

);
}