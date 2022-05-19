//models
const { Restaurant } = require("../models/restaurantsModel");
const { Review } = require("../models/reviewsModel");

//utils
const { catchAsync } = require("../utils/catchAsync");

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({ where: { status: "active" } });

  res.status(200).json({ restaurants });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({ newRestaurant });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: "active" },
  });

  res.status(200).json({
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const restaurant = await Restaurant.findOne({ where: { id } });

  await restaurant.update({ name, address });

  res.status(200).json({ status: "success" });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ id });

  await restaurant.update({ status: "deleted" });

  res.status(200).json({ status: "success" });
});

//REVIEWS
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

const getReviewById = catchAsync(async (req, res, next) => {
  const { text } = req;

  res.status(200).json({ text });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { text } = req;

  res.status(200).json({ text });

  await text.update({ comment, rating });

  res.status(200).json({ status: "success" });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { text } = req;

  await text.update({ status: "deleted" });

  res.status(200).json({ status: "success" });
});

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
};
