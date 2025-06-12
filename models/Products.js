import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
    realPrice: {
      type: String,
    },
    buyPrice: {
      type: String,
    },
    offerPrice: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    rating: {
      type: String,
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
      id: {
        type: ObjectId,
        ref: "Category",
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
