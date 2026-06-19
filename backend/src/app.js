const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middlewares/error.middleware");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1", routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerHub AI API Running",
  });
});

app.get("/error", (req, res, next) => {
  next(
    new ApiError(
      400,
      "This is a test error"
    )
  );
});

app.use(errorMiddleware);

module.exports = app;
