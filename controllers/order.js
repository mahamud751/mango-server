import OrderModel from "../models/Order.js";

export const createOrder = async (req, res) => {
  const newOrder = new OrderModel(req.body);
  try {
    const result = await newOrder.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.find({});
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getMyBooking = async (req, res, next) => {
  try {
    const email = req.query.email;
    const order = await OrderModel.find({ email: email });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
