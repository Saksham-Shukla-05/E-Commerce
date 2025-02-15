import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";

export default function User() {
  return (
    <Layout title={"Admin DashBoard- AllUsers"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>See All Users</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
