const { Restaurant } = require("./restaurantsModel");
const { Meal } = require("./mealsModel");
const { Order } = require("./ordersModel");
const { User } = require("./userModel");
const { Review } = require("./reviewsModel");

const initModel = () => {
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);
};

module.exports = { initModel };
