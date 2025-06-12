import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["cash", "bkash", "card"], // Restrict to valid payment methods
    },
    cart: [
      {
        id: String,
        name: String,
        variety: String,
        imageUrl: String,
        quantity: Number,
        originalPrice: String,
        discountedPrice: String,
      },
    ],
    grandPrice: {
      type: String,
      required: true,
    },
    getState: {
      type: Array, // Keep as is if backend expects it, or remove if unused
      default: [],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
