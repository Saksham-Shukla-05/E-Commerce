import express from "express";
import formidable from "express-formidable";

import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  categoryWiseProductController,
  createProductController,
  deleteProductsController,
  getProductController,
  getSingleProductsController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productSearchController,
  razorpayCreateOrder,
  razorpayVerifyPayment,
  relatedProductController,
  updateProductController,
} from "../controllers/ProductController.js";
const router = express.Router();

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);
//get products
router.get("/getProduct", getProductController);
export default router;

//update products
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/getSingleProducts/:slug", getSingleProductsController);

router.delete("/DeleteProduct/:pid", deleteProductsController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//filter
router.post("/Product-filter", productFiltersController);

//product count
router.get("/Product-count", productCountController);

router.get("/Product-list/:page", productListController);

router.get("/search/:keyword", productSearchController);

router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/category-wise-product/:slug", categoryWiseProductController);

//payment routes
router.post("/create/order", razorpayCreateOrder);

router.post("/verify/payment/razorpay", requireSignin, razorpayVerifyPayment);
