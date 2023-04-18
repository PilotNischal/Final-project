import mongoose from "mongoose";
import config from "../config";
import logger from "../logger/logger";
const localhost = "mongodb://127.0.0.1/ecommerce";

const db = async () => {
  try {
    await mongoose
      .set("strictQuery", false)
      .connect(config.MONGO_URL as string, {
        retryWrites: true,
        w: "majority",
      });
    console.log("====================================");
    console.log("DataBase connection successful");
    console.log("====================================");
  } catch (error) {}
};

export default db;
