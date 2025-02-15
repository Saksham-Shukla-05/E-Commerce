import React from "react";
import Layout from "./../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
export default function AdminDashBoard() {
  const [authData] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>{authData?.user?.name}</h4>
              <h4>{authData?.user?.email}</h4>
              <h4>{authData?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
