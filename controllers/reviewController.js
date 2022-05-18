const { Review } = require("../models/reviewsModel");

const { catchAsync } = require("../utils/catchAsync");

const getAllCReviews = catchAsync(async (req, res, next) => {
  const comments = await Comments.findAll({ where: { status: "active" } });

  res.status(200).json({ comments });
});

const createReview = catchAsync(async (req, res, next) => {
  const { text, rating } = req.body;
  const { restaurantId } = req.params;
  const { sessionUser } = req;

  const newReview = await Comment.create({
    text,
    rating,
    restaurantId,
    userId: sessionUser.id,
  });

  res.status(201).json({ newReview });
});

const updateReview = catchAsync(async (req, res, next) => {});

const deleteReview = catchAsync(async (req, res, next) => {});
