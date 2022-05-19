//bookstore
const express = require("express");

//middlewares
const { protectToken, protectAdmin } = require("../middlewares/userMiddleware");

const { mealExists } = require("../middlewares/orderMiddleware");
//controllers
const {
  getAllMeals,
  createMeal,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealsController");

//models
//routes
const router = express.Router();
router.route("/").get(getAllMeals);

router.use(protectToken);
router
  .route("/:id")
  .get(getMealById)
  .post(protectAdmin, mealExists, createMeal)
  .patch(protectAdmin, updateMeal)
  .delete(protectAdmin, deleteMeal);

//utils

module.exports = { mealsRouter: router };
