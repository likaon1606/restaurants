//bookstore
const express = require("express");

//middlewares
const {
  protectToken,
  protectUserOwner,
  protectAdmin,
} = require("../middlewares/userMiddleware");

const { reviewExists } = require("../middlewares/reviewMiddleware");

const {
  createRestaurantValidations,
  checkValidations,
} = require("../middlewares/validationMiddleware");
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
const { getAllReviews } = require("../controllers/reviewController");

//models
//routes
const router = express.Router();
router
  .route("/")
  .get(getAllRestaurants)
  .post(createRestaurantValidations, checkValidations, createRestaurant);
router.route("/reviews").get(getAllReviews);

router
  .route("/:id", protectAdmin)
  .get(getRestaurantById)
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

router.use(protectToken);
//Reviews
router
  .route("/reviews/:id", reviewExists)
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);
//utils

module.exports = { restaurantsRouter: router };
