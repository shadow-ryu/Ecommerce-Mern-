import mongoose from 'mongoose';

const sellerorderSchema = new mongoose.Schema(
  { 
    costumer: { type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    productID: {type: mongoose.Schema.Types.ObjectId,  ref: 'Product',required: true},
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    cancelled: { type: Boolean, default: false  },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const sellerOrder = mongoose.model('sellerOrder', sellerorderSchema);
export default sellerOrder;