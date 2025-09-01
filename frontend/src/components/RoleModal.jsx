import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import InputField from "./InputField";

export default function RoleModal({ open, onClose, onSave, editingRole }) {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (editingRole) setRoleName(editingRole.name);
    else setRoleName("");
  }, [editingRole]);

  const handleSubmit = () => {
    if (roleName.trim() === "") return;
    onSave({ name: roleName.trim(), id: editingRole?.id });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3>{editingRole ? "Edit Role" : "Create Role"}</h3>
      <InputField
        label="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Enter role name"
      />
      <Button onClick={handleSubmit} disabled={!roleName.trim()}>
        {editingRole ? "Update Role" : "Create Role"}
      </Button>
      <Button onClick={onClose} variant="secondary" style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </Modal>
  );
}
