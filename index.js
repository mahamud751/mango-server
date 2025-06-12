import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js";
import adminRoute from "./routes/admin.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/category.js";
import productsRoute from "./routes/products.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("successfully connect with mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/user", usersRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5003, () => {
  connect();
  console.log("connect with backend");
});
