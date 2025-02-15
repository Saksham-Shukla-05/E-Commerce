import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
const SearchContxet = createContext();

const SearchProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    keyword: "",
    Product: [],
  });

  return (
    <SearchContxet.Provider value={[authData, setAuthData]}>
      {children}
    </SearchContxet.Provider>
  );
};
export default function auth() {
  return <div></div>;
}

const useSearch = () => useContext(SearchContxet);
export { useSearch, SearchProvider };
