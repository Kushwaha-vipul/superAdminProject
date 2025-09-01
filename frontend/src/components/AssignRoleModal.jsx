import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function AssignRoleModal({ open, user, allRoles, onAssign, onClose }) {
  const [role, setRole] = useState("");

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h3>Assign Role to {user.email}</h3>
      <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px' }}>
        <option value="">--Select Role--</option>
        {allRoles.map(r => (
          <option key={r.id} value={r.name}>{r.name}</option>
        ))}
      </select>
      <Button onClick={() => onAssign(user.id, role)} disabled={!role}>Assign</Button>
      <Button onClick={onClose} variant="secondary" style={{ marginLeft: 8 }}>Cancel</Button>
    </Modal>
  );
}
