import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import OrderModel from "../models/OrderModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });
    if (!phone) return res.send({ message: "Phone no. is required" });
    if (!address) return res.send({ message: "Address is required" });
    if (!answer) return res.send({ message: "Answer is required" });

    // checking user
    const exisitingUser = await userModel.findOne({ email });

    // exisiting user

    if (exisitingUser)
      return res.status(200).send({
        success: false,
        message: "Email Already Registerd ",
      });

    // Register the User

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Successfully Registerd",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registering the User",
      error,
    });
  }
};

// METHOD POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password)
      return res.status(404).send({
        success: false,
        message: "Invalid Email and Password",
      });

    console.time("DB Query");
    const user = await userModel.findOne({ email });
    console.timeEnd("DB Query");

    if (!user)
      return res.status(404).send({
        success: false,
        message: "Email not registerd",
      });
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });

    //Creating Token After Successfull Login
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(200).send({
      success: true,
      message: "Successfull Login",
      LogedInUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in loging in",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("protected Route");
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Input validation
    if (!email) return res.status(400).send({ message: "email is required" });
    if (!answer) return res.status(400).send({ message: "answer is required" });
    if (!newPassword)
      return res.status(400).send({ message: "newPassword is required" });

    // Check if user exists and answer matches
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    // Update password
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    console.log(updatedUser);

    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const getOrdersControllers = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyers: req.user._id })
      .populate("products")
      .populate("buyers", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("products")
      .populate("buyers", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const UpdateOrdersStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log("Status", status);
    console.log("Order Id", orderId);

    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Changing Status",
      error,
    });
  }
};
