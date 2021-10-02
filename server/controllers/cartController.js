import Product from "../models/product.js";
import Cart from "../models/addCart.js";
import User from "../models/user.js";

//add to cart
export const addToCart = async (req, res) => {
  try {
    const id = req.params.id;
    const defaultQty = 1;
    const user = req.userData.id;
    const existingCart = await Cart.find({ user: user }); //find() returns a list
    if (id) {
      //checks if user has a cart item
      if (existingCart.length === 0) {
        const foundProduct = await Product.findById(id).then((product) => {
          const productToAdd = {
            productID: product._id,
            name: product.name,
            seller: product.seller,
            image: product.image,
            price: product.price,
            qty: defaultQty,
            totalprice: product.price * defaultQty,
          };

          const newCart = new Cart({
            user: user,
            cartItems: productToAdd,
          });
          newCart.save();
        });
      } else {
        const foundProduct = await Product.findById(id);
        const alreadycartItem = existingCart[0]?.cartItems.filter((el) => {
          return el.productID.toString() === id.toString();
        });

        const productId = foundProduct._id;
        const price = foundProduct.price;
        const name = foundProduct.name;
        const seller = foundProduct.seller;
        const image = foundProduct.image;

        const totalPrice = price * defaultQty;
        const productToAdd = {
          productID: productId,
          name: name,
          seller: seller,
          image: image,
          price: price,
          qty: defaultQty,
          totalprice: totalPrice,
        };
        const updstedCart = await Cart.updateOne(
          { user: user },
          {
            $push: {
              cartItems: productToAdd,
            },
          }
        );

        res.json({ message: "product added to cart" });
      }
    } else {
      res.send("invalid id");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
// -------------------------------------------------------------//
//remove from cart logic //
export const removeitem = async (req, res) => {
  try {
    const id = req.params.id;

    const user = req.userData.id;

    const cart = await Cart.find({ user: user }, { cartItems: 1 });

    const cartItems = cart[0].cartItems;

    var filtered = cartItems.filter(function (el) {
      return el.productID == id;
    });

    const reomveId = filtered[0]?._id;

    await Cart.updateOne(
      { user: user },
      { $pull: { cartItems: { _id: reomveId } } },
      { new: true }
    ).then((result) => {
      res.status(201).json({ message: "  You have removed" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
//------------------------------------------------//
// get user User cart  logic//
export const myCart = async (req, res) => {
  try {
    const user = req.userData.id;
    const cart = await Cart.find({ user: user }, { cartItems: 1 });
    if (cart[0]?.cartItems.length === 0) {
      res.json({ message: "empty cart" });
    } else {
      const cartItems = cart[0]?.cartItems.map((p) => p.totalprice);
      const totalPrice = cartItems?.reduce((a, b) => a + b, 0);
      const sellers = cart?.[0]?.cartItems.map((s) => {
        return s?.seller?.toString();
      });
      const sellersSet = new Set(sellers);

      let arrayy = Array.from(sellersSet);
      // console.log(arrayy);
      const shippingPrices = [];
      for (const s of arrayy) {
        shippingPrices.push(await User.find({ _id: s }, { sellerDetails: 1 }));
      }
      const responseData = [];
      for (let i = 0; i < shippingPrices.length; i++) {
        responseData[i] = shippingPrices[i][0];
      }
      const responseDataPrice = [];
      for (let i = 0; i < shippingPrices.length; i++) {
        responseDataPrice[i] =
          shippingPrices[i][0]?.sellerDetails?.shippingPrice;
      }
      const totalShippingPrice = responseDataPrice?.reduce((a, b) => a + b, 0);
      const grandtotalPrice = totalShippingPrice + totalPrice;

      if (totalShippingPrice != 0 && grandtotalPrice != 0) {
        await Cart.updateOne(
          { user: user },
          {
            $set: {
              ShipingPrice: totalShippingPrice,
              grandtotalPrice: grandtotalPrice,
            },
          }
        );
      }
      const endresult = await Cart.find({ user: user }).then((result) => {
        res.status(201).json(result);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
