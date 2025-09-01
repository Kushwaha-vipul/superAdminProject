const AuditLog = require('../models/auditLog');
const { Op } = require('sequelize');

exports.getAuditLogs = async (req, res) => {
  try {
    const { user, action, date } = req.query;
    let filter = {};

    if (user) filter.actorUserId = user;
    if (action) filter.action = action;
    if (date) filter.createdAt = { [Op.gte]: new Date(date) }; 

    const logs = await AuditLog.findAll({
      where: filter,
      order: [['createdAt', 'DESC']] 
    });

    res.json(logs);
  } catch (err) {
    console.error("Get Audit Logs Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
