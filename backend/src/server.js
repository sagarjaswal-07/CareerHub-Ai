require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const env = require("./config/env");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(
        `Server running on http://localhost:${env.port}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();