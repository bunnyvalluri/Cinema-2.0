export const getAnalyticsData = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      userGrowth: [12000, 19000, 24000, 32000, 38000, 42000, 48250],
      topGenres: [
        { genre: 'Action', views: 350000 },
        { genre: 'Sci-Fi', views: 420000 },
        { genre: 'Drama', views: 290000 },
      ],
    });
  } catch (error) {
    next(error);
  }
};
