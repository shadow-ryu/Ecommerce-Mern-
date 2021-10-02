// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     // name: { type: String, required: true },
//     // email: { type: String, required: true, unique: true },
//     // password: { type: String, required: true },
//     // role: { type: String, default: "user", required: true },
//     // sellerDetails: {
//     //   name: String,
//     //   logo: String,
//     //   description: String,
//     //   rating: { type: Number, default: 0, required: true },
//     //   numReviews: { type: Number, default: 0, required: true },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

export default mongoose.model("cate", categorySchema);
