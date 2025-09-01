const { User, AuditLog } = require('../models');
const bcrypt = require('bcryptjs');


async function listUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
}

async function getUser(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
}


async function createUser(req, res) {

    const { name, email, password, roles } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const rolesToAssign = roles && Array.isArray(roles) && roles.length ? roles : ['user'];
    const user = await User.create({ name, email, hashedPassword, roles: rolesToAssign });



    await AuditLog.create({ actorUserId: req.user.id, action: 'create_user', targetType: 'User', targetId: user.id, details: JSON.stringify({ name, email, roles: rolesToAssign }) });

    res.status(201).json(user);
}


async function updateUser(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password, roles } = req.body;
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.hashedPassword = await bcrypt.hash(password, 10);
         if (roles !== undefined && Array.isArray(roles)) user.roles = roles;

    await user.save();

    await AuditLog.create({ actorUserId: req.user.id, action: 'update_user', targetType: 'User', targetId: user.id,  details: JSON.stringify({ name, email, roles }) });

    res.json(user);
}


async function deleteUser(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    await AuditLog.create({ actorUserId: req.user.id, action: 'delete_user', targetType: 'User', targetId: user.id });

    res.json({ message: 'User deleted' });
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
