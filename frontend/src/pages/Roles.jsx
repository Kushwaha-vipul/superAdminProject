import React, { useEffect, useState } from "react";
import { getRoles, create, update } from "../services/roleService";
import RoleModal from "../components/RoleModal";
import Button from "../components/Button";
import styles from "../styles/Roles.module.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const data = await getRoles();
    setRoles(data || []);
  };

  const handleCreateClick = () => {
    setEditingRole(null);
    setModalOpen(true);
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleSave = async ({ id, name }) => {
    if (id) {
      await update(id, { name });
    } else {
      await create({ name });
    }
    setModalOpen(false);
    loadRoles();
  };

  return (
    <div className={styles.container}>
      <h2>Manage Roles</h2>
      <Button onClick={handleCreateClick} style={{ marginBottom: 16 }}>
        Create New Role
      </Button>
      <ul>
        {roles.map((r) => (
          <li key={r.id} style={{ marginBottom: 12 }}>
            {r.name}
            <Button
              variant="secondary"
              onClick={() => handleEditClick(r)}
              style={{ marginLeft: 12, fontSize: '0.9rem' }}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>

      <RoleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingRole={editingRole}
      />
    </div>
  );
};

export default Roles;
