import express from "express";
const router = express.Router();
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";

//create category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);
//Update Category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//get all category
router.get("/get-category", getCategoryController);

//single category
router.get("/single-category/:slug", getSingleCategoryController);
export default router;

//delete category

router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);
