const User = require('./user');
const Role = require('./role');
const AuditLog = require('./auditLog');

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

module.exports = { User, Role, AuditLog };
