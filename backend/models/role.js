const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('Role', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    permissions: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] }
}, {});

module.exports = Role;
