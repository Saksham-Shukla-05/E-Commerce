import Layout from "../components/Layout";
import React from "react";
import { useSearch } from "../context/Search";

function Search() {
  const [value, setValue] = useSearch();

  return (
    <Layout title="search">
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {value.Product.length > 1
              ? `Found ${value?.Product.length}`
              : "No Product Found"}
          </h6>
          <div className="d-flex flex-wrap">
            {value.Product?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img src={p.photo} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title"> {p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 12)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                  <p className="card-text">{p.category.name}</p>
                  <button className="btn btn-primary">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
