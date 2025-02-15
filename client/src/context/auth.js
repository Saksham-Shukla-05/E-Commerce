import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
const AuthContxet = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = authData?.token;
  useEffect(() => {
    const data = localStorage.getItem("authData");
    if (data) {
      const parseData = JSON.parse(data);
      setAuthData({
        ...authData,
        user: parseData.LogedInUser,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContxet.Provider value={[authData, setAuthData]}>
      {children}
    </AuthContxet.Provider>
  );
};
export default function auth() {
  return <div></div>;
}

const useAuth = () => useContext(AuthContxet);
export { useAuth, AuthProvider };
