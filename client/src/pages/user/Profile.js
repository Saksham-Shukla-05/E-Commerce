import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import auth, { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [authData, setAuthData] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (authData?.user) {
      const { name, email, phone, address } = authData.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [authData?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/Update-profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      console.log(data);

      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuthData({ ...authData, user: data?.updatedUser });
        let ls = localStorage.getItem("authData");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        console.log("checking ls ", ls);
        localStorage.setItem("authData", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4>User Profile</h4>
                <div className="mb-3">
                  <input
                    value={name}
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    disabled
                    value={email}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={password}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={phone}
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={address}
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
