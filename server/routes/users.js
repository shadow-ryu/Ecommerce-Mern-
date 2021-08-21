import express from "express";
const router = express.Router();
import { checkAuth, isSellerOrAdmin } from "../middleWare/roleAuth.js";
import { signin, signup, MyProducts } from "../controllers/userContoller.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/MyProducts", checkAuth, isSellerOrAdmin, MyProducts);

export default router;
