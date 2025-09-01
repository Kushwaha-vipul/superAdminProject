import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ children, onClick, disabled, variant = 'primary', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
