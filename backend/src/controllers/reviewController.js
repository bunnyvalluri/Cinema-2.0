export const getMovieReviews = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    return res.status(200).json({
      success: true,
      reviews: [
        {
          id: 'rev_101',
          movieId,
          userName: 'Alex Rivers',
          rating: 5,
          content: 'Incredible direction and immersive audio design.',
          likes: 24,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { movieId, movieTitle, rating, content } = req.body;
    const newReview = {
      id: 'rev_' + Date.now(),
      movieId,
      movieTitle,
      rating,
      content,
      userName: req.user?.displayName || 'Film Critic',
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    next(error);
  }
};
