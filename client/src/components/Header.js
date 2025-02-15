import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";
import { Badge, Avatar } from "antd";
export default function Header() {
  const [authData, setAuthData] = useAuth();
  const category = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuthData({
      ...authData,
      user: null,
      token: "",
    });
    localStorage.removeItem("authData");
    toast.success("User Logged Out Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to={"/"} className="navbar-brand">
            🛒 E-Commerce App
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link " aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to={"/categories"}
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"} href="#">
                      All Categories
                    </Link>
                  </li>
                  {category?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        href="#"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!authData.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {authData?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            authData?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item mt-1 fs-6 fw-bold">
                <Badge count={cart?.length} showZero>
                  <NavLink to={"/cart"} className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
