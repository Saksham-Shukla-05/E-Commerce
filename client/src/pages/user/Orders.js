import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [authData, setAuthData] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      console.log(data);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authData?.token) getOrders();
  }, [authData?.token]);
  const navigate = useNavigate();

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p className="text-center mt-5"> No orders yet</p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/")}
                >
                  Place An Order Now
                </button>
              </div>
            )}
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyers?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>
                          {o?.payment.razorpay_payment_id
                            ? "Success"
                            : "Failed"}
                        </td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {Object.values(
                      o?.products?.reduce((acc, p) => {
                        if (!acc[p._id]) {
                          acc[p._id] = { ...p, quantity: 1 };
                        } else {
                          acc[p._id].quantity += 1;
                        }
                        return acc;
                      }, {})
                    ).map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={p.photo}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price: {p.price}</p>
                          <p>Quantity: {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
