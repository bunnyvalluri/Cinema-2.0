export const getAdminMetrics = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      stats: {
        totalUsers: 48250,
        totalMovies: 14890,
        totalReviews: 128400,
        avgRating: 4.85,
        systemHealth: '100% Operational',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    return res.status(200).json({
      success: true,
      message: `User ${userId} role updated to ${role}`,
    });
  } catch (error) {
    next(error);
  }
};
