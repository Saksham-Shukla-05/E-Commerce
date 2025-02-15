import Layout from "../../components/Layout.js";
import UserMenu from "../../components/UserMenu.js";
import { useAuth } from "../../context/auth.js";
export default function Dashboard() {
  const [authData] = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <p>Name : {authData?.user?.name}</p>
              <p>Email : {authData?.user?.email}</p>
              <p>Phone : {authData?.user?.phone}</p>
              <p>Address : {authData?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
