import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation: Check if name is provided
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Error! Name is Required",
      });
    }

    // Check if category already exists
    const ExistingCategory = await categoryModel.findOne({ name });
    if (ExistingCategory) {
      return res.status(401).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // Create a new category
    const Category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    // Respond with success
    res.status(200).send({
      success: true,
      message: "Category Created",
      Category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while Updating",
      error,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "list of all Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Categories",
      error,
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    console.log(req.params);
    const { slug } = req.params;
    const Category = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Sinlge Categories",
      Category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Single finding Categories",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Sinlge Category deleted",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting  Category",
      error,
    });
  }
};
