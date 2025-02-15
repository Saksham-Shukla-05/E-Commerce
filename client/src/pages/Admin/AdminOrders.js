import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Option } = Select;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [authData, setAuthData] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/All/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authData?.token) getAllOrders();
  }, [authData?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/Status/Update/${orderId}`,
        { status: value }
      );
      getAllOrders();
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              // Group products by ID and calculate quantities
              const groupedProducts = Object.values(
                o?.products?.reduce((acc, p) => {
                  if (!acc[p._id]) {
                    acc[p._id] = { ...p, quantity: 1 };
                  } else {
                    acc[p._id].quantity += 1;
                  }
                  return acc;
                }, {})
              );

              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Total Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyers?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>
                          {o?.payment.razorpay_payment_id
                            ? "Success"
                            : "Failed"}
                        </td>
                        <td>
                          {groupedProducts.reduce(
                            (sum, p) => sum + p.quantity,
                            0
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {groupedProducts.map((p) => (
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
}

export default AdminOrders;
