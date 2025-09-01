const User = require('../models/user');
const Role = require('../models/role');
const { Op } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const rolesCount = await Role.count();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers = await User.count({ where: { lastLogin: { [Op.gte]: sevenDaysAgo } } });

    res.json({
      totalUsers,
      rolesCount,
      activeUsers
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
