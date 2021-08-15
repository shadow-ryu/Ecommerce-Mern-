import Product  from "../models/product.js";
import Cart  from "../models/addCart.js";
import Order  from "../models/order.js";
import SellerOrder from "../models/sellerOder.js";

export const placeOrder = async (req, res)=>{
    try {
      const user= req.userData.id;
      const{shippingAddress,paymentMethod,shippingPrice,taxPrice,isPaid,paidAt} =req.body
      const userCart= await Cart.find({user:user},{_id:0,grandtotalPrice:1 ,cartItems: 1});
      //if cart is empty logic
      const totalCartprice= userCart[0].grandtotalPrice;
      const  totalPrice= totalCartprice+shippingPrice+ taxPrice;
      const cartItems = userCart[0].cartItems.map(p => p)
      const sellerorder= cartItems.forEach(product =>{
        var newSellerOrder= new SellerOrder({
                costumer: user,
                productID:product.productID,
                name: product.name,
                seller:product.seller ,
                image: product.image,
                price:product.price ,
                qty:product.qty ,
                })
            newSellerOrder.save()
        })
      
  
    
            
      
     const newOrder= new Order({
  
      orderItems:cartItems,
      shippingAddress:shippingAddress,
      paymentMethod:paymentMethod,
      shippingPrice:shippingPrice,
      taxPrice:taxPrice,
      totalPrice:totalPrice,
      user:user,
      
      isPaid:isPaid
  
     })
  newOrder.save()
  
   
  // // findOneAndDelete
  
  const empty= await Cart.findOneAndDelete({user:user})  .then( result=>{
    res.json({ message: "order is placed and cart is empty now." });
  
  });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
    })
    }
      
  }









export const myBill=async (req, res) => {



}


export const myOrder = async (req, res) => {

}


export const sellerOrderList = async (req, res) => {}