import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import crypto from "crypto";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import uploadFile from "../utils/uploadFile.js";
dotenv.config();

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (!shipping)
      return res.status(400).send({ error: "shipping response is required" });
    if (photo && photo.size > 1000000)
      return res
        .status(400)
        .send({ error: "photo is Required and should be less then 1mb" });
    const photoUrl = await uploadFile(photo.path, "Home");

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
      photo: photoUrl,
    });

    await products.save();

    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error: error.message,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const Products = await productModel
      .find()
      .populate("category")
      // .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Listed All Products",
      length: Products.length,
      Products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Product",
      error: error.message, // Send the error message for debugging
    });
  }
};

// export const updateProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.fields; // Assuming the photo is stored in req.files

//     console.log(photo);

//     // Validation
//     if (!name) return res.status(400).send({ error: "Name is required" });
//     if (!description)
//       return res.status(400).send({ error: "Description is required" });
//     if (!price) return res.status(400).send({ error: "Price is required" });
//     if (!category)
//       return res.status(400).send({ error: "Category is required" });
//     if (!quantity)
//       return res.status(400).send({ error: "Quantity is required" });

//     // Create new product instance
//     const product = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       {
//         ...req.fields,
//         slug: slugify(name),
//       },
//       { new: true }
//     );

//     // Handling photo upload
//     if (photo) {
//       product.photo.data = fs.readFileSync(photo.path); // Correct way to assign photo data
//       product.photo.contentType = photo.type;
//     }

//     // Save product
//     await product.save();

//     // Send success response
//     res.status(200).send({
//       success: true,
//       message: "Product Updating Successfully",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Updating Product",
//       error: error.message, // Send the error message for debugging
//     });
//   }
// };

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const photoUrl = await uploadFile(photo.path, "Home");

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, photo: photoUrl, slug: slugify(name) },
      { new: true }
    );

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const getSingleProductsController = async (req, res) => {
  try {
    const { slug } = req.params;
    const Product = await productModel.findOne({ slug }).populate("category");
    res.status(200).send({
      success: true,
      message: "Products Found",
      Product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Product",
      error: error.message, // Send the error message for debugging
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const Product = await productModel.findById(req.params.pid);
    if (Product.photo.data) {
      res.set("Content-type", Product.photo.contentType);
      return res.status.send(Product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Photo",
      error: error.message, // Send the error message for debugging
    });
  }
};

export const deleteProductsController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting Product",
      error: error.message, // Send the error message for debugging
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    console.log(checked, radio);

    if (checked.length > 0) args.category = checked;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const Products = await productModel.find(args);
    res.status(200).send({
      success: true,
      Products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    console.log("total", total);

    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const Product = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      Product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params; // Get the search key from the URL parameters
    const Products = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    console.log(Products);

    res.json(Products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in searching",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const Product = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })

      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      Product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product searching",
      error,
    });
  }
};

export const categoryWiseProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });

    const Products = await productModel.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      Products,
      category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while getting product ",
      error,
    });
  }
};

// payment gateway

export const razorpayCreateOrder = async (req, res) => {
  const { amount, currency } = req.body;
  console.log(amount, currency);
  console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100, // Razorpay requires the amount in paise (multiply by 100 for INR and cents for USD)
      currency: currency || "USD", // Default to USD
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const razorpayVerifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, cart } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const order = new OrderModel({
        products: cart,
        payment: {
          razorpay_payment_id,
          razorpay_order_id,
          status: "Paid",
        },
        buyers: req.user._id,
        status: "Not Process",
      });

      await order.save();

      res.json({ success: true, order });
    } catch (error) {
      console.error("Error while processing order:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to save order", error });
    }
  } else {
    res.json({ success: false, message: "Payment verification failed!" });
  }
};
