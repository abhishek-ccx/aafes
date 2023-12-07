const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
