function requireSuperadmin(req, res, next) {
    if (!req.user || !req.user.roles.includes('superadmin')) {
        return res.status(403).json({ message: 'Forbidden: Superadmin only' });
    }
    next();
}

module.exports = requireSuperadmin;
