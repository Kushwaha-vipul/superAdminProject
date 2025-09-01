import React from 'react';
import styles from '../styles/InputField.module.css';

const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  id,
  name,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={id || name} className={styles.label}>{label}</label>}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
};

export default InputField;
