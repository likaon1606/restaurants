// Models
const { Review } = require("../models/reviewsModel");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appErrors");

const reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id } });

  if (!review) {
    return next(new AppError("Review not found with given id", 404));
  }

  req.review = review;

  next();
});

module.exports = { reviewExists };
