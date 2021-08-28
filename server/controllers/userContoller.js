import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../models/product.js";
import UserModal from "../models/user.js";
import shippingAddressM from "../models/shippingAddress.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.HIDDEN_JWT;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
        sellerDetails: oldUser.sellerDetails,
      },
      secret,
      { expiresIn: "5h" }
    );

    res.status(200).json({ user: oldUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ eroor: err.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role, sellerDetails } =
    req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModal.create({
      email,
      password: hashedPassword,
      role: role,
      sellerDetails: sellerDetails,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user._id,
        role: role,
        sellerDetails: sellerDetails,
      },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
export const MyProducts = async (req, res) => {
  try {
    const user = req.userData.id;
    const product = await Product.find({ seller: user });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
export const Myaddress = async (req, res) => {
  try {
    const user = req.userData.id;
    const ShippingAddress = await shippingAddressM.find({ user: user });

    res.status(200).json(ShippingAddress);
  } catch (error) {
    console.log(error);
  }
};
