import { useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
        <h1>Regsiter</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <input
              required
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
          <div className="mb-3">
            <input
              required
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
              required
              value={address}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <input
              required
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your birth month"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
