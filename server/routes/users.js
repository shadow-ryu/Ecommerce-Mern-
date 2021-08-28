import express from "express";
const router = express.Router();
import { checkAuth, isSellerOrAdmin } from "../middleWare/roleAuth.js";
import { signin, signup, MyProducts } from "../controllers/userContoller.js";
import { getadress } from "../controllers/adreesController.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/MyProducts", checkAuth, isSellerOrAdmin, MyProducts);
router.get("/address", checkAuth, getadress);
// router.get("/getSellerShippingPrice", checkAuth, );

export default router;
