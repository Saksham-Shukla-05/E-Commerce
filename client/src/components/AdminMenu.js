import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Pannel</h4>
        {/* <NavLink
          to={""}
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          The current link item
        </NavLink> */}
        <NavLink
          to={"/dashboard/admin/create-category"}
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to={"/dashboard/admin/create-new-product"}
          className="list-group-item list-group-item-action"
        >
          Create New Product
        </NavLink>
        <NavLink
          to={"/dashboard/admin/products"}
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to={"/dashboard/admin/orders"}
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/admin/users"}
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
}
