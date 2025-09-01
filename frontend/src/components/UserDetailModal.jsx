import React from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function UserDetailModal({ user, open, onClose }) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h3>User Detail</h3>
      <div><strong>ID:</strong> {user.id}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role(s):</strong> {Array.isArray(user.roles) ? user.roles.join(", ") : user.role}</div>
      <div><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</div>
      <Button onClick={onClose}>Close</Button>
    </Modal>
  );
}
