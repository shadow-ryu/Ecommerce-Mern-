import Product from "../models/product.js";
import Cart from "../models/addCart.js";
import Order from "../models/order.js";
import SellerOrder from "../models/sellerOder.js";
import shippingAddressM from "../models/shippingAddress.js";

export const placeOrder = async (req, res) => {
  try {
    const user = req.userData.id;
    const { shippingAddress, paymentMethod, paymentResult, isPaid, paidAt } =
      req.body;
    const userCart = await Cart.find(
      { user: user },
      { _id: 0, grandtotalPrice: 1, cartItems: 1 }
    );
    //if cart is empty logic
    const totalCartprice = userCart[0]?.grandtotalPrice;
    const shippingPrice = userCart[0]?.ShipingPrice;
    const totalPrice = totalCartprice;
    const cartItems = userCart[0]?.cartItems?.map((p) => p);
    const sellerorder = cartItems?.forEach((product) => {
      var newSellerOrder = new SellerOrder({
        costumer: user,
        productID: product.productID,
        name: product.name,
        seller: product.seller,
        image: product.image,
        price: product.price,
        qty: product.qty,
      });
      newSellerOrder.save();
    });

    if (shippingAddress?._id) {
      const address_id = shippingAddress?._id;
      const Useradress = await shippingAddressM.find({ _id: address_id });

      const newOrder = new Order({
        orderItems: cartItems,
        shippingAddress: {
          fullName: shippingAddress.fullName,
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          contact_no: shippingAddress.contact_no,
          lat: shippingAddress.lat,
          lng: shippingAddress.lng,
        },
        paymentMethod: paymentMethod,
        shippingPrice: shippingPrice,
        paymentResult: paymentResult,
        totalPrice: totalPrice,
        user: user,

        isPaid: isPaid,
      });
      newOrder.save();
    } else {
      const newshippingAddress = new shippingAddressM({
        fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        contact_no: shippingAddress.contact_no,
        lat: shippingAddress.lat,
        lng: shippingAddress.lng,

        user: user,
      });
      newshippingAddress.save();
      const newOrder = new Order({
        orderItems: cartItems,
        shippingAddress: {
          fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          contact_no: shippingAddress.contact_no,
          lat: shippingAddress.lat,
          lng: shippingAddress.lng,
        },
        paymentMethod: paymentMethod,
        shippingPrice: shippingPrice,

        totalPrice: totalPrice,
        user: user,

        isPaid: isPaid,
      });
      newOrder.save();
    }

    // // findOneAndDelete

    await Cart.findOneAndDelete({ user: user });
    res.json({ message: "order is placed and cart is empty now." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myBill = async (req, res) => {};

export const myOrder = async (req, res) => {};

export const sellerOrderList = async (req, res) => {
  const user = req.userData.id;
  await SellerOrder.find({ seller: user }).then((result) => {
    res.status(201).json(result);
  });
};
