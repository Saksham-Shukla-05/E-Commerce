import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersControllers,
  getAllOrdersController,
  UpdateOrdersStatus,
} from "../controllers/authController.js";
import {
  isAdmin,
  isUser,
  requireSignin,
} from "../middlewares/authMiddleware.js";
//router object

const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
//LOGIN || METHOD POST
router.post("/login", loginController);
//test route
router.get("/test", requireSignin, isAdmin, testController);

router.post("/test-login", (req, res) => {
  console.log(req.body);
  res.send({ success: true, message: "Test route working" });
});

//Protected Auth Route for Dashboard

router.get("/user-auth", requireSignin, isUser, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Auth Route for Admin Dashboard
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password
router.post("/forgot-password", forgotPasswordController);

router.put("/Update-profile", requireSignin, updateProfileController);

router.get("/orders", requireSignin, getOrdersControllers);

router.get("/All/orders", requireSignin, isAdmin, getAllOrdersController);

router.put(
  "/Status/Update/:orderId",
  requireSignin,
  isAdmin,
  UpdateOrdersStatus
);

export default router;
