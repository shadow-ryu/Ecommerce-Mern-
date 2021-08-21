import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const checkAuth = (req, res, next) => {
  const secret = process.env.HIDDEN_JWT;
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, secret);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      errmessage: error.message,
    });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.userData && req.userData.role == "admin") {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
export const isSeller = (req, res, next) => {
  if (req.userData && req.userData.role == "seller") {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (
    req.userData &&
    (req.userData.role == "seller" || req.userData.role == "admin")
  ) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};
