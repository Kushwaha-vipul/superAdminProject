const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const AuditLog = sequelize.define('AuditLog', {
    actorUserId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    targetType: { type: DataTypes.STRING },
    targetId: { type: DataTypes.INTEGER },
    details: { type: DataTypes.JSON }
}, { timestamps: true });

module.exports = AuditLog;
