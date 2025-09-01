import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { getRoles, assignRoleNames } from "../services/roleService";
import UserDetailModal from "../components/UserDetailModal";
import AssignRoleModal from "../components/AssignRoleModal";
import Button from "../components/Button";
import styles from "../styles/Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setUsers(usersData || []);
      const rolesData = await getRoles();
      setRoles(rolesData || []);
    })();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2>Manage Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Role</th><th>Created At</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>
                  <Button onClick={() => setSelectedUser(u)}>View</Button>
                  <Button variant="secondary" onClick={() => setRoleUser(u)} style={{ marginLeft: 8 }}>
                    Assign Role
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDetailModal
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      <AssignRoleModal
        open={!!roleUser}
        user={roleUser}
        allRoles={roles}
        onAssign={async (userId, roleName) => {
          await assignRoleNames(userId, [roleName]);
          setRoleUser(null);
          const updatedUsers = await getUsers();
          setUsers(updatedUsers || []);
        }}
        onClose={() => setRoleUser(null)}
      />
    </>
  );
};

export default Users;
