import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  contact_no: { type: Number, required: true },
  lat: Number,
  lng: Number,
});
const shippingAddress = mongoose.model(
  "shippingAddress",
  shippingAddressSchema
);
export default shippingAddress;
