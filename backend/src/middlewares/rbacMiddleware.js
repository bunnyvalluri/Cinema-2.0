export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const userRole = req.user.role || 'user';

    if (allowedRoles.includes(userRole) || userRole === 'administrator') {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Forbidden. Required role: [${allowedRoles.join(', ')}]. Your role: ${userRole}`,
    });
  };
};
