const { Review } = require("../models/reviewsModel");

const { catchAsync } = require("../utils/catchAsync");

const getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.findAll();

  res.status(200).json({ review });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;

  const newReview = await Review.create({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });

  res.status(201).json({ newReview });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { text } = req;

  await text.update({ comment, rating });

  res.status(200).json({ status: "success" });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { comment } = req;

  await comment.update({ status: "deleted" });

  res.status(200).json({ status: "success" });
});

module.exports = { createReview, updateReview, deleteReview, getAllReviews };
