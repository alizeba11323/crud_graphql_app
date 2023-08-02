const mongoose = require("mongoose");
const { consola } = require("consola");
const { DB_URI } = require("../config");
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    consola.success({ message: "DB Connected", badge: true });
  } catch (err) {
    consola.error({ message: err.message, badge: true });
  }
};

module.exports = connectDB;
