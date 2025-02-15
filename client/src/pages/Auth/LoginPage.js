import axios from "axios";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authData, setAuthData] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("request sent");
      console.log(`${process.env.REACT_APP_API}/api/v1/auth/test-login`);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res && res.data.success) {
        console.log(res);

        toast.success(res.data.message);
        setAuthData({
          ...authData,
          user: res.data.LogedInUser,
          token: res.data.token,
        });
        localStorage.setItem("authData", JSON.stringify(res.data));
        navigate(location.state || "/");
        // console.log(res.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="regsiter">
        <h1>Login</h1>
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

          <button type="submit" className="btn btn-primary ">
            Login
          </button>
          <div className="mt-3 mb-3">
            <button
              type="submit"
              onClick={() => navigate("/forgotPassword")}
              className="btn btn-primary"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
