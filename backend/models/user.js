const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
    roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    lastLogin: { type: DataTypes.DATE }
}, {});

module.exports = User;
