import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";
import Products from "../models/Products.js";

dotenv.config();

const seedProductsData = [
  {
    name: "Organic Himsagar Mango",
    description: "Premium quality Himsagar mangoes grown organically in Chapai Nawabganj.",
    price: 70,
    originalPrice: 85,
    images: [
      "https://i.ibb.co/j99wBhys/himsagar-1.webp",
      "https://i.ibb.co/VWMpKmsq/himsagar-2.webp",
      "https://i.ibb.co/spQ0h5Mj/himsagar-3.webp",
    ],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    benefits: ["100% Organic Certification", "No Artificial Ripening", "Direct from Farm to Doorstep", "Rich in Vitamins A & C"],
    variety: "Himsagar",
    slug: "organic-himsagar-mango",
  },
  {
    name: "Premium Langra Mango",
    description: "Authentic Langra mangoes from Rajshahi with unmatched sweetness.",
    price: 75,
    originalPrice: 90,
    images: [
      "https://i.ibb.co/SwyRFrch/langra-1.webp",
      "https://i.ibb.co/6RbN54yz/langra-2.webp",
      "https://i.ibb.co/DHxhpZsj/langra-3.webp",
    ],
    rating: 4.7,
    reviews: 110,
    stock: 20,
    benefits: ["Naturally Ripened", "High Sugar Content", "Farm to Table Fresh", "Rich Aroma and Taste"],
    variety: "Langra",
    slug: "premium-langra-mango",
  },
  {
    name: "Organic Amrapali Mango",
    description: "Juicy Amrapali mangoes with a perfect balance of sweetness and acidity.",
    price: 72,
    originalPrice: 87,
    images: [
      "https://i.ibb.co/YK1Nb1C/amrapali-1.webp",
      "https://i.ibb.co/ksB200hd/amrapali-2.webp",
      "https://i.ibb.co/FLpJMkD5/amrapali-3.webp",
    ],
    rating: 4.6,
    reviews: 95,
    stock: 30,
    benefits: ["Long Shelf Life", "Perfect for Juices", "Farm Grown & Organic", "Low Fiber, Smooth Texture"],
    variety: "Amrapali",
    slug: "organic-amrapali-mango",
  },
  {
    name: "Fresh Fazli Mango",
    description: "Large, fibrous, and juicy Fazli mangoes ideal for pickles and pulps.",
    price: 70,
    originalPrice: 85,
    images: [
      "https://i.ibb.co/zhDBPH75/fazli-1.webp",
      "https://i.ibb.co/WWLYbPch/fazli-2.webp",
      "https://i.ibb.co/Rpb0ySZP/fazli-3.webp",
    ],
    rating: 4.5,
    reviews: 80,
    stock: 18,
    benefits: ["Best for Pickles", "Fiber Rich", "High Yield per Mango", "Grown in Chapai"],
    variety: "Fazli",
    slug: "fresh-fazli-mango",
  },
  {
    name: "Khirshapat Mango Delight",
    description: "Popular Khirshapat mangoes, known for their smooth, melt-in-mouth texture.",
    price: 80,
    originalPrice: 95,
    images: [
      "https://i.ibb.co/qSCqBNz/khirshapat-1.webp",
      "https://i.ibb.co/C5b5SRdP/khirshapat-2.webp",
      "https://i.ibb.co/vvw0QNFq/khirshapat-3.webp",
    ],
    rating: 4.9,
    reviews: 135,
    stock: 22,
    benefits: ["Silky Smooth Texture", "No Fibers", "Excellent for Desserts", "Bangladeshi Favorite"],
    variety: "Khirshapat",
    slug: "khirshapat-mango-delight",
  },
  {
    name: "Gopalbhog Mango Premium",
    description: "Early season Gopalbhog mangoes packed with flavor and fragrance.",
    price: 70,
    originalPrice: 85,
    images: [
      "https://i.ibb.co/bMGndQnM/gopalbhog-1.webp",
      "https://i.ibb.co/1tvkvtYh/gopalbhog-2.webp",
      "https://i.ibb.co/Z68DkzJk/gopalbhog-3.webp",
    ],
    rating: 4.4,
    reviews: 89,
    stock: 16,
    benefits: ["Early Season Mango", "Smooth and Sweet", "Great Aroma", "No Artificial Ripening"],
    variety: "Gopalbhog",
    slug: "gopalbhog-mango-premium",
  },
  {
    name: "Organic Mohanbhog Mango",
    description: "Rare and delightful Mohanbhog mangoes from Rajshahi's finest orchards.",
    price: 75,
    originalPrice: 90,
    images: [
      "https://i.ibb.co/8ndHfS2S/mohanbhog-1.webp",
      "https://i.ibb.co/fV4qg6RW/mohanbhog-2.webp",
      "https://i.ibb.co/gMJ6bsCx/mohanbhog-3.webp",
    ],
    rating: 4.6,
    reviews: 67,
    stock: 12,
    benefits: ["Unique Flavor", "Rare Variety", "Naturally Grown", "Excellent for Gifting"],
    variety: "Mohanbhog",
    slug: "organic-mohanbhog-mango",
  },
  {
    name: "Organic Surjapuri Mango",
    description: "Surjapuri mangoes sweet, juicy, and beloved for their light yellow skin.",
    price: 72,
    originalPrice: 87,
    images: [
      "https://i.ibb.co/DHnTZMFT/surjapuri-1.webp",
      "https://i.ibb.co/5hhNsLLQ/surjapuri-2.webp",
      "https://i.ibb.co/FbFrgHY3/surjapuri-3.webp",
    ],
    rating: 4.3,
    reviews: 75,
    stock: 14,
    benefits: ["Distinctive Skin Tone", "High Sugar Content", "Satisfying Juiciness", "No Chemicals Used"],
    variety: "Surjapuri",
    slug: "organic-surjapuri-mango",
  },
  {
    name: "Kalibhog Mango Selection",
    description: "Aromatic Kalibhog mangoes, small in size but big on taste.",
    price: 70,
    originalPrice: 85,
    images: [
      "https://i.ibb.co/gbQgTJXT/kalibhog-1.webp",
      "https://i.ibb.co/YTwVGm3m/kalibhog-2.webp",
      "https://i.ibb.co/0pMWbQZr/kalibhog-3.webp",
    ],
    rating: 4.2,
    reviews: 60,
    stock: 19,
    benefits: ["Small But Flavorful", "Rich Scent", "Loved by Locals", "Fresh from Garden"],
    variety: "Kalibhog",
    slug: "kalibhog-mango-selection",
  },
  {
    name: "Organic Bombai Mango",
    description: "Traditional Bombai mangoes with a firm bite and nostalgic flavor.",
    price: 75,
    originalPrice: 90,
    images: [
      "https://i.ibb.co/1Gswhp0j/bombai-1.webp",
      "https://i.ibb.co/hxhVT5Kj/bombai-2.webp",
      "https://i.ibb.co/Y4H4Bz1P/bombai-3.webp",
    ],
    rating: 4.1,
    reviews: 58,
    stock: 13,
    benefits: ["Firm Flesh", "Old School Taste", "Naturally Ripened", "Cultural Favorite"],
    variety: "Bombai",
    slug: "organic-bombai-mango",
  },
  {
    name: "Laxmanbhog Mango",
    description: "Laxmanbhog mangoes deliciously sweet and soft, loved across generations.",
    price: 78,
    originalPrice: 95,
    images: [
      "https://i.ibb.co/HDWnvLkd/laxmanbhog-1.webp",
      "https://i.ibb.co/PvsL3BNp/laxmanbhog-2.webp",
      "https://i.ibb.co/VpNtSnw7/laxmanbhog-3.webp",
    ],
    rating: 4.3,
    reviews: 65,
    stock: 20,
    benefits: ["Rich Legacy", "Soft Texture", "Highly Juicy", "Farm Fresh"],
    variety: "Laxmanbhog",
    slug: "laxmanbhog-mango",
  },
  {
    name: "Organic Neelumbori Mango",
    description: "A rare gem Neelumbori mangoes are fibrous, big, and perfectly pulpy.",
    price: 72,
    originalPrice: 87,
    images: [
      "https://i.ibb.co/pB8jkNWX/neelumbori-1.webp",
      "https://i.ibb.co/Jw7TnWjQ/neelumbori-2.webp",
      "https://i.ibb.co/bgGswrcR/neelumbori-3.webp",
    ],
    rating: 4.0,
    reviews: 45,
    stock: 11,
    benefits: ["Rare Local Variety", "Large and Pulpy", "Perfect for Juicing", "Organic and Fresh"],
    variety: "Neelumbori",
    slug: "organic-neelumbori-mango",
  },
];

async function seedProducts() {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing in .env");
  }

  await mongoose.connect(process.env.MONGO_URL);

  const category = await Category.findOneAndUpdate(
    { name: "Mangoes" },
    { name: "Mangoes", banner: "", img: [] },
    { new: true, upsert: true }
  );

  await Products.deleteMany({});
  const products = await Products.insertMany(
    seedProductsData.map((product) => ({ ...product, category: category._id }))
  );

  await Category.updateOne({ _id: category._id }, { $set: { products: products.map((p) => p._id) } });

  console.log(`Seed complete: inserted ${products.length} products.`);
  await mongoose.disconnect();
}

seedProducts()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  });
