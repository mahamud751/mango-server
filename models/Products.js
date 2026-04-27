import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    variety: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    benefits: {
      type: [String],
      default: [],
    },
    productType: {
      type: String,
      enum: ["regular", "offer", "flashsale"],
      default: "regular",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    qtn: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
