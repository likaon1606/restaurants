//models
const { Order } = require("../models/ordersModel");
const { Meal } = require("../models/mealsModel");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appErrors");

const createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next(new AppError("Meal not found", 404));
  }

  const totalPrice = meal.price * quantity;

  const newOrder = await Order.create({
    mealId,
    quantity,
    totalPrice,
    userId: sessionUser.id,
  });

  res.status(201).json({ newOrder });
});

const getAllUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: { status: "active" },
    include: [{ model: Meal, attributes: ["name"] }],
  });

  res.status(200).json({ orders });
});

const orderComplete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id } });

  await order.update({ status: "completed" });

  res.status(200).json({ status: "success" });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Meal.findOne({ where: { id } });

  await order.update({ status: "cancelled" });

  res.status(200).json({ status: "success" });
});

module.exports = { createOrder, getAllUserOrders, orderComplete, deleteOrder };
