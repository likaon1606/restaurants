//bookstore
const express = require("express");
const { body } = require("express-validator");

//middlewares
const {
  protectToken,
  userExists,
  protectAdmin,
  protectUserOwner,
} = require("../middlewares/userMiddleware");

const { orderExists } = require("../middlewares/orderMiddleware");

const {
  createUserValidations,
  checkValidations,
} = require("../middlewares/validationMiddleware");

//controllers
const {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deactivatedUser,
  getAllOrders,
  getOrderById,
} = require("../controllers/userController");

//routes
const router = express.Router();

router
  .route("/singup")
  .post(createUserValidations, checkValidations, createUser);

router.route("/login").post(login);

router.use(protectToken);
router.route("/").get(protectAdmin, getAllUsers);

router.route("/orders").get(getAllOrders);

router
  .route("/:id")
  .patch(protectUserOwner, userExists, updateUser)
  .delete(protectUserOwner, userExists, deactivatedUser);

router.route("/orders/:id").get(orderExists, getOrderById);

//utils

module.exports = { userRouter: router };
