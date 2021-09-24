import express from "express";

import { checkAuth, isSellerOrAdmin } from "../middleWare/roleAuth.js";
import { placeOrder } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", checkAuth, placeOrder);

export default router;
