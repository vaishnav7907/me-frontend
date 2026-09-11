import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const MeContext = createContext();

export const MeProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  // ================= ADMIN AUTH =================

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // ================= PRODUCT =================

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrandName, setProductBrandName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRealPrice, setProductRealPrice] = useState("");

  const [productImage, setProductImage] = useState([]);

  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("Active");

  // get products
  const [allproducts, setAllProducts] = useState([]);

  // latest arrivals
  
  
  return (
    <MeContext.Provider
      value={{
        // Sidebar
        sidebar,
        setSidebar,

        // Authentication
        FullName,
        setFullName,
        Email,
        setEmail,
        Password,
        setPassword,

        // Product
        productName,
        setProductName,

        productDescription,
        setProductDescription,

        productCategory,
        setProductCategory,

        productBrandName,
        setProductBrandName,

        productPrice,
        setProductPrice,

        productRealPrice,
        setProductRealPrice,

        productImage,
        setProductImage,

        sku,
        setSku,

        status,
        setStatus,

        allproducts,
        setAllProducts,

       
      }}
    >
      {children}
    </MeContext.Provider>
  );
};

export const UseMe = () => useContext(MeContext);
