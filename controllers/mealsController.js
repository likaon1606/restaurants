//models
const { Meal } = require("../models/mealsModel");
const { Restaurant } = require("../models/restaurantsModel");
//utils
const { catchAsync } = require("../utils/catchAsync");

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: "active" },
    include: [{ model: Restaurant, attributes: ["id", "name", "address"] }],
  });

  res.status(200).json({ meals });
});

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({ newMeal });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id, status: "active" } });

  res.status(200).json({ meal });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.findOne({ where: { id } });

  await meal.update({ name, price });

  res.status(200).json({ status: "success" });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id } });

  await meal.update({ status: "deactiveted" });

  res.status(200).json({ status: "success" });
});

module.exports = {
  getAllMeals,
  createMeal,
  getMealById,
  updateMeal,
  deleteMeal,
};

//const createOrder = catchAsync(async (req, res, next) => {
//   const { sessionUser } = req;
//   const { mealId, quantity } = req.body;

//   const meal = await Meal.findByPk(mealId);

//   if (!meal) {
//     return next(new AppError('Meal not found', 404));
//   }

//   const totalPrice = meal.price * quantity;

//   const newOrder = await Order.create({
//     mealId,
//     quantity,
//     totalPrice,
//     userId: sessionUser.id,
//   });

//   res.status(201).json({
//     status: 'Your order was successfully created',
//     newOrder,
//   });
// });

// En el caso de getUserOrderById desde users.controller, yo resolví así:
// const getUserOrderById = catchAsync(async (req, res, next) => {
//   const { user } = req;
//   const { id } = req.params;

//   // Get order
//   const order = await Order.findOne({
//     where: {
//       userId: user.id,
//       id,
//     },
//     include: [
//       {
//         model: Meal,
//         attributes: ['id', 'name', 'price'],
//         include: [{ model: Restaurant, attributes: ['id', 'name'] }],
//       },
//     ],
//   });
// con esta instrucción en users.route
// router.get('/orders/:id', getUserOrderById);
// Y funciona bien
