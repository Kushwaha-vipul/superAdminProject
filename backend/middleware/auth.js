const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

function requireSuperadmin(req, res, next) {
    if (!req.user || !req.user.roles.includes('superadmin')) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}

module.exports = { authenticateToken, requireSuperadmin };
