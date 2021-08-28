import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  contact_no: { type: Number },
  lat: Number,
  lng: Number,
});
const shippingAddressM = mongoose.model(
  "shippingAddress",
  shippingAddressSchema
);
export default shippingAddressM;
