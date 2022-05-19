//bookstore
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//controllers
const { globalErrorHandler } = require("./controllers/errorController");
//middlewares
//models

//routes
const { userRouter } = require("./routes/userRoutes");
const { restaurantsRouter } = require("./routes/restaurantsRoutes");
const { mealsRouter } = require("./routes/mealsRoutes");
const { ordersRouter } = require("./routes/ordersRoutes");

const app = express();

app.use(cors());

app.use(express.json());

//Limit IP request
const limiter = rateLimit({
  max: 10000,
  window: 1 * 60 * 60 * 1000,
  message: "To many request fom this IP",
});

app.use(limiter);

// Endpoints
// http://localhost:4000
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantsRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/orders", ordersRouter);

app.use("*", globalErrorHandler);

module.exports = { app };
