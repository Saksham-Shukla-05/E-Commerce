import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.Product);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/getSingleProducts/${params.slug}`
      );
      setProduct(data?.Product);
      console.log(data?.Product?._id, data?.Product?.category?._id);

      getSimilarProducts(data?.Product?._id, data?.Product?.category._id);
    } catch (error) {}
  };
  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={product.photo}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Details</h1>
          <h4>Name : {product.name}</h4>
          <h4>Description : {product.description}</h4>
          <h4>Price : {product.price}$</h4>
          <h4>Category : {product?.category?.name}</h4>
          <h4>Shipping : {product.shipping ? "Yes" : "No"}</h4>
          <button className="btn btn-secondary ms-1">Add to Cart</button>
        </div>
      </div>
      <div className="row">
        {relatedProducts?.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
              src={p.photo}
              style={{ height: "100px", width: "100px" }}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title"> {p.name}</h5>
              <p className="card-text">{p.description.substring(0, 12)}...</p>
              <p className="card-text">${p.price}</p>
              <p className="card-text">{p.category.name}</p>

              <button className="btn btn-secondary ms-1">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProductDetails;
