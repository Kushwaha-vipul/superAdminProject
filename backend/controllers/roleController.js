const Role = require('../models/role');
const User = require('../models/user');
const AuditLog = require('../models/auditLog');


exports.listRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const existing = await Role.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: `Role '${name}' already exists` });
    }

    const role = await Role.create({ name, permissions: permissions || [] });

    await AuditLog.create({
      actorUserId: req.user.id,
      action: 'CREATE_ROLE',
      targetType: 'Role',
      targetId: role.id,
      details: JSON.stringify(req.body),
      timestamp: new Date()
    });

    res.status(201).json(role);
  } catch (err) {
    console.error('Create Role Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    const { name, permissions } = req.body;
    if (name) role.name = name;
    if (permissions) role.permissions = permissions;

    await role.save();

    await AuditLog.create({
      actorUserId: req.user.id,
      action: 'UPDATE_ROLE',
      targetType: 'Role',
      targetId: role.id,
      details: JSON.stringify(req.body),
      timestamp: new Date()
    });

    res.json(role);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.assignRole = async (req, res) => {
  try {
    const { userId, roles } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const roleInstances = await Role.findAll({ where: { name: roles } });
    if (!roleInstances.length) return res.status(404).json({ message: 'Roles not found' });

    await user.setRoles(roleInstances);

    await AuditLog.create({
      actorUserId: req.user.id,
      action: 'ASSIGN_ROLE',
      targetType: 'User',
      targetId: user.id,
      details: JSON.stringify({ assignedRoles: roles }),
      timestamp: new Date()
    });

    res.json({ message: `Roles [${roles}] assigned to ${user.name}` });
  } catch (err) {
    console.error("Assign Role Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

