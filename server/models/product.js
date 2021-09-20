import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    specs: [],
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productSchema);
export default product;
