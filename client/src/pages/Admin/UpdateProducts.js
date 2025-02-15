import React, { use, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { data, useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/getSingleProducts/${params.slug}`
      );

      setName(data.Product.name);
      setId(data.Product._id);
      setDescription(data.Product.description);
      setPrice(data.Product.price);
      setQuantity(data.Product.quantity);
      setShipping(data.Product.shipping);
      setPhoto(data.Product.photo);
      setCategory(data.Product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Data");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      newPhoto && productData.append("photo", newPhoto);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //delete product
  const handleDelete = async () => {
    let answer = window.prompt("Are you sure to delete this product");
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/DeleteProduct/${id}`
      );
      toast.success("Product Deleted Sucessfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Admin DashBoard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-10">
                  {"Change Photo"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                <div className="mb-3">
                  {newPhoto ? (
                    <img
                      src={URL.createObjectURL(newPhoto)}
                      alt="New Photo"
                      height="100px"
                      className="mt-3 img img-responsive"
                    />
                  ) : (
                    <img
                      src={photo}
                      alt="Backend Photo"
                      height="100px"
                      className="mt-3 img img-responsive"
                    />
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="price"
                    placeholder="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    variant={false}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value={"1"}>Yes</Option>
                    <Option value={"0"}>No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary " onClick={handleUpdate}>
                    {" "}
                    Update Product
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    {" "}
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
