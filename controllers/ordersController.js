//models
const { Order } = require("../models/ordersModel");

//utils
const { catchAsync } = require("../utils/catchAsync");

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, id } = req.body;

  const newOrder = await Order.create({
    quantity,
    mealId: id,
  });

  res.status(201).json({ newOrder });
});

const getAllUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({ where: { status: "active" } });

  res.status(200).json({ orders });
});

const orderComplete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Meal.findOne({ where: { id } });

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
