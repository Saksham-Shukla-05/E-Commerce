import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <Layout title={"forgot password"}>
      <div className="regsiter">
        <h1>Forgot Password</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <input
              required
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
              required
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your birth month"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              required
              value={newPassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary ">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}
