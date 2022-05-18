//bookstore
const express = require("express");

//middlewares

//controllers
const {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurantController");

//models
//routes
const router = express.Router();
router.route("/").get(getAllRestaurants).post(createRestaurant);

router
  .route("/:id")
  .get(getRestaurantById)
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

router
  .route("/reviews/:id")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);
//utils

module.exports = { restaurantsRouter: router };
