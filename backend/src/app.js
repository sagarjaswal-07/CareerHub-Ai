const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middlewares/error.middleware");
const routes = require("./routes");

const app = express();

/*
 Global Middlewares
*/

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/*
 Swagger Documentation
*/

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
 API Routes
*/

app.use("/api/v1", routes);

/*
 Health Check
*/

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerHub AI API Running",
  });
});

/*
 Test Error Route
*/

app.get("/error", (req, res, next) => {
  next(new ApiError(400, "This is a test error"));
});

/*
 Global Error Handler
*/

app.use(errorMiddleware);

module.exports = app;
