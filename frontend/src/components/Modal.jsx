import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Modal.module.css';

const Modal = ({ open, onClose, children }) => {

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
};

export default Modal;
