import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      contact_no:{ type: Number, required: true },
      lat: Number,
      lng: Number,
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String, 
      status: String,
      update_time: String,
      email_address: String,
    },

    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
   
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
   
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;