import express from "express";
const router = express.Router();
import { checkAuth, isSellerOrAdmin } from "../middleWare/roleAuth.js";
import { signin, signup, MyProducts } from "../controllers/userContoller.js";
import { getadress } from "../controllers/adreesController.js";
import {
  myBill,
  myOrder,
  myOrderByID,
  sellerOrderByID,
  sellerOrderList,
  updatemyOrderByID,
  updatesellerOrderByID,
} from "../controllers/orderController.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/MyProducts", checkAuth, isSellerOrAdmin, MyProducts);
router.get("/sellerOrders", checkAuth, isSellerOrAdmin, sellerOrderList);
router.get("/sellerOrderById/:id", checkAuth, isSellerOrAdmin, sellerOrderByID);
router.get("/myOrder", checkAuth, myOrder);
router.get("/myBills", checkAuth, myBill);
// router.get("/myOrder/:id", checkAuth, myOrderByID);
router.get("/myOrder/:id", checkAuth, updatemyOrderByID);
router.patch(
  "/sellerOrderById/:id",
  checkAuth,
  isSellerOrAdmin,
  updatesellerOrderByID
);

router.get("/address", checkAuth, getadress);
// router.get("/getSellerShippingPrice", checkAuth, );

export default router;
