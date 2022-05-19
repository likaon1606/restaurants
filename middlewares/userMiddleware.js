//bookstore
const jwt = require("jsonwebtoken");
//models
const { User } = require("../models/userModel");
//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appErrors");

const protectToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Credentials are not valid", 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(new AppError("Is not a token valid, please try again", 403));
  }

  req.sessionUser = user;

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== "admin") {
    return next(new AppError("Access not granted", 403));
  }

  next();
});

const protectCustomer = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== "customer") {
    return next(new AppError("Access not granted", 403));
  }

  next();
});

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError("User does not exist given Id", 404));
  }

  req.user = user;

  next();
});

const protectUserOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError("You do not own this account", 403));
  }

  next();
});

module.exports = {
  protectToken,
  userExists,
  protectUserOwner,
  protectAdmin,
  protectCustomer,
};
