import Product from "../models/product.js";
import Cart from "../models/addCart.js";

export const addToCart = async (req, res) => {
  const id = req.params.id;
  const defaultQty = 1;
  const user = req.userData.id;
  const existingCart = await Cart.find({ user: user }); //find() returns a list

  if (existingCart.length === 0) {
    const foundProduct = await Product.findById(id)
      .then((product) => {
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
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err.message,
        });
      });
  } else {
    const foundProduct = await Product.findById(id);

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
};

export const removeitem = async (req, res) => {
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
  )
    .then((result) => {
      res.status(201).json({ message: "  You have removed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
export const myCart = async (req, res) => {
  const user = req.userData.id;
  const cart = await Cart.find({ user: user }, { cartItems: 1 });
  if (cart.length === 0) {
    res.status(400).send("empty cart");
  } else {
    const cartItems = cart[0].cartItems.map((p) => p.totalprice);
    const totalPrice = cartItems.reduce((a, b) => a + b, 0);
    await Cart.updateOne(
      { user: user },
      { $set: { grandtotalPrice: totalPrice } },
      { new: true }
    );
    const endresult = await Cart.find({ user: user })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err.message,
        });
      });
  }
};
