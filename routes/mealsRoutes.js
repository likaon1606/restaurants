//bookstore
const express = require("express");

//middlewares
const { protectToken } = require("../middlewares/userMiddleware");
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

//router.use(protectToken);
router
  .route("/:id")
  .get(getMealById)
  .post(createMeal)
  .patch(updateMeal)
  .delete(deleteMeal);

//utils

module.exports = { mealsRouter: router };
