import { useState, useEffect, createContext, useContext } from "react";
const CartContxet = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContxet.Provider value={[cart, setCart]}>
      {children}
    </CartContxet.Provider>
  );
};

const useCart = () => useContext(CartContxet);
export { useCart, CartProvider };
