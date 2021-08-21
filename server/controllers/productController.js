import Product from "../models/product.js";

import mongoose from "mongoose";
export const getAllproducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const user = req.userData.id;

  const newProduct = new Product({
    // req.body
    name: req.body.name,
    seller: user,

    image: req.body.image,
    brand: req.body.brand,
    specs: req.body.specs,
    category: req.body.category,
    description: req.body.description,
    price: parseInt(req.body.price),
    countInStock: parseInt(req.body.countInStock),
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  newProduct
    .save()
    .then((result) => {
      res.status(200).json({
        message:
          " The product has been added successfully and the details are below.",
        CreatedProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    });
};
export const updateProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  Product.updateOne({ _id: id }, { $set: req.body })
    .then((course) => {
      res.status(201).json({
        message: " u have  updated the test course",
        course: course,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await Product.findByIdAndRemove(id)
    .then((result) => {
      res.json({ message: "Product deleted successfully." });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
};
