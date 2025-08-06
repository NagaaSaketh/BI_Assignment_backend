const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO;

const initialiseDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected successfully."))
    .catch((err) => console.log("Error while connecting to the db", err));
};

module.exports = {initialiseDatabase}