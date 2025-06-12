import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
    banner: {
      type: String,
    },
    products: [
      {
        type: ObjectId,
        ref: "Products",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
