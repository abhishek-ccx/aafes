const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("Database connected successful!"))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
