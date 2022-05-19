//bookstore
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//models
const { User } = require("../models/userModel");
const { Order } = require("../models/ordersModel");
const { Meal } = require("../models/mealsModel");
const { Restaurant } = require("../models/restaurantsModel");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appErrors");

dotenv.config({ path: "./set.env" });

//controllers
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({});

  res.status(200).json({ users });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("Credentials are not valid", 400));

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({ status: "success" });
});

const deactivatedUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deactivated" });

  res.status(200).json({ status: "success" });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Meal,
        attributes: ["name"],
        include: [{ model: Restaurant, attributes: ["name"] }],
      },
    ],
  });

  res.status(200).json({ orders });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { order } = req;

  const orderDetail = await Order.findOne({
    include: [
      {
        model: Meal,
        attributes: ["name"],
        include: [{ model: Restaurant, attributes: ["name"] }],
      },
    ],
  });

  res.status(200).json({ order, orderDetail });
});

module.exports = {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deactivatedUser,
  getAllOrders,
  getOrderById,
};
