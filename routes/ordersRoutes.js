//bookstore
const express = require("express");

//middlewares
const {
  protectUserOwner,
  protectToken,
  protectAdmin,
  protectCustomer,
} = require("../middlewares/userMiddleware");
//controllers
const {
  createOrder,
  getAllUserOrders,
  orderComplete,
  deleteOrder,
} = require("../controllers/ordersController");

const { orderExists, mealExists } = require("../middlewares/orderMiddleware");

//models
//routes
const router = express.Router();

router.use(protectToken);
router.route("/").post(createOrder);
router.route("/me").get(protectCustomer, getAllUserOrders);
router.route("/:id").patch(orderComplete).delete(deleteOrder);

//utils

module.exports = { ordersRouter: router };
