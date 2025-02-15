import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [category, setCategory] = useState([]);
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return category;
}
