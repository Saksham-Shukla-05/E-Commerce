import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected route token based

export const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("User is not found", error);
  }
};

// middleWare for Admin

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1)
      return res.status(401).send({
        success: false,
        message: "You are not Admin ",
      });
    else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
export const isUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 0)
      return res.status(401).send({
        success: false,
        message: "You are not User ",
      });
    else {
      next();
    }
  } catch (error) {
    console.log("User is not found", error);
  }
};
