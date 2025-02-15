import React, { useEffect, useState } from "react";
import Prices from "../components/Prices";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  //get total
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/Product-count`
      );

      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);
  //filtering backend

  const filterproducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/Product-filter`,
        { checked, radio }
      );
      setProducts(data.Products);
    } catch (error) {
      console.log(error);
    }
  };

  //get category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Data");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/Product-list/${page}`
      );

      setLoading(false);
      setProducts(data.Product);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (!checked.length || radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterproducts();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/Product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.Product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  return (
    <Layout title={"All product"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex mt-3 flex-column">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-danger"
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products?.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img src={p.photo} className="card-img  -top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title"> {p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 12)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                    <p className="card-text">{p.category.name}</p>
                    <button
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                      className="btn btn-primary"
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Product Added");
                      }}
                      className="btn btn-secondary ms-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No Product Found for this Filter</p>
            )}
          </div>
          <div className="p-3 m-2">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="btn btn-warning"
              >
                {loading ? "Loading" : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
