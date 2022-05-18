//models
const { User } = require("../models/userModel");
const { Order } = require("../models/ordersModel");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appErrors");

const orderExists = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const order = await Order.findOne({ where: { userId, status: "active" } });

  if (!order) {
    return next(new AppError("Order not found, pleace make your order", 404));
  }

  req.order = order;

  next();
});

module.exports = { orderExists };
