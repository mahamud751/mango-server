import Category from "../models/Category.js";
import Products from "../models/Products.js";
export const CreateProducts = async (req, res, next) => {
  const newProducts = new Products(req.body);
  try {
    const product = await newProducts.save();
    const { _id: productId, category } = product;
    //update Brand

    const ress = await Category.updateOne(
      { _id: category.id },
      { $push: { products: productId } }
    );
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const product = await Products.find({}).populate("category");
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const getSingleProducts = async (req, res, next) => {
  try {
    const result = await Products.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
export const deleteProducts = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const updateProducts = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
