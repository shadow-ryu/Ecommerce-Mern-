import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = process.env.HIDDEN_JWT;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id , role:oldUser.role ,sellerDetails:oldUser.sellerDetails }, secret, { expiresIn: "5h" });

    res.status(200).json({ user: oldUser, token });
  } catch (err) {
    res.status(500).json({ eroor:err.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, name ,role,sellerDetails} = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name :name,role:role ,sellerDetails:sellerDetails});

    const token = jwt.sign( { email: result.email, id: result._id, role:role ,sellerDetails:sellerDetails}, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
     
    console.log(error);
  }
};


