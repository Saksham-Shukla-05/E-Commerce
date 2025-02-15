import React, { useEffect, useState } from "react";
import Admin from "../../components/AdminMenu.js";
import Layout from "../../components/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/getProduct`
      );

      setProducts(data.Products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Admin />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  className="product-link"
                  to={`/dashboard/admin/product/${p.slug}`}
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img src={p.photo} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title"> {p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
