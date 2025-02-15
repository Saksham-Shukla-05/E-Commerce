import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CategoryList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-wise-product/${params.slug}`
      );
      setProducts(data?.Products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <h4>Category {category?.name}</h4>
        <h6>{products?.length} Result Found</h6>
        {products?.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }}>
            <img src={p.photo} className="card-img-top" alt={p.name} />
            <div className="card-body">
              <h5 className="card-title"> {p.name}</h5>
              <p className="card-text">{p.description.substring(0, 12)}...</p>
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
              <button className="btn btn-secondary ms-1">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CategoryList;
