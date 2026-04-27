import Category from "../models/Category.js";
import Products from "../models/Products.js";

const normalizeCategoryId = (categoryValue) => {
  if (!categoryValue) return null;
  if (typeof categoryValue === "string") return categoryValue;
  if (typeof categoryValue === "object" && categoryValue.id) return categoryValue.id;
  return null;
};

export const CreateProducts = async (req, res, next) => {
  try {
    const categoryId = normalizeCategoryId(req.body.category);
    const newProducts = new Products({
      ...req.body,
      category: categoryId,
      images: req.body.images || req.body.img || [],
      description: req.body.description || req.body.shortDescription || "",
      price: Number(req.body.price ?? req.body.offerPrice ?? req.body.buyPrice ?? 0),
      originalPrice: Number(
        req.body.originalPrice ?? req.body.realPrice ?? req.body.price ?? 0
      ),
      stock: Number(req.body.stock ?? req.body.qtn ?? 0),
      rating: Number(req.body.rating ?? 0),
      reviews: Number(req.body.reviews ?? 0),
    });

    const product = await newProducts.save();

    if (categoryId) {
      await Category.updateOne(
        { _id: categoryId },
        { $addToSet: { products: product._id } }
      );
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.slug) {
      filter.slug = req.query.slug;
    }

    const product = await Products.find(filter).populate("category");
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const getSingleProducts = async (req, res, next) => {
  try {
    const result = await Products.findById(req.params.id).populate("category");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
export const deleteProducts = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (product?.category) {
      await Category.updateOne(
        { _id: product.category },
        { $pull: { products: product._id } }
      );
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const updateProducts = async (req, res, next) => {
  try {
    const categoryId = normalizeCategoryId(req.body.category);
    const existingProduct = await Products.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatePayload = {
      ...req.body,
    };

    if (req.body.images || req.body.img) {
      updatePayload.images = req.body.images || req.body.img || [];
    }
    if (req.body.description || req.body.shortDescription) {
      updatePayload.description = req.body.description || req.body.shortDescription || "";
    }
    if (req.body.price || req.body.offerPrice || req.body.buyPrice) {
      updatePayload.price = Number(
        req.body.price ?? req.body.offerPrice ?? req.body.buyPrice ?? 0
      );
    }
    if (req.body.originalPrice || req.body.realPrice) {
      updatePayload.originalPrice = Number(
        req.body.originalPrice ?? req.body.realPrice ?? updatePayload.price ?? 0
      );
    }
    if (req.body.stock || req.body.qtn) {
      updatePayload.stock = Number(req.body.stock ?? req.body.qtn ?? 0);
    }
    if (req.body.rating) {
      updatePayload.rating = Number(req.body.rating ?? 0);
    }
    if (req.body.reviews) {
      updatePayload.reviews = Number(req.body.reviews ?? 0);
    }
    if (categoryId !== null) {
      updatePayload.category = categoryId;
    }

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: updatePayload },
      { new: true }
    );

    if (categoryId && existingProduct.category?.toString() !== categoryId) {
      if (existingProduct.category) {
        await Category.updateOne(
          { _id: existingProduct.category },
          { $pull: { products: existingProduct._id } }
        );
      }
      await Category.updateOne(
        { _id: categoryId },
        { $addToSet: { products: existingProduct._id } }
      );
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
