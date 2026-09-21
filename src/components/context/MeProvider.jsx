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

  const [discount, setDiscount] = useState(0);
  const [brands, setBrands] = useState([]);

  // get products
  const [allproducts, setAllProducts] = useState([]);

  const [productId, setProductId] = useState("");

  // update products modal
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const [productDltModal, setProductDltModal] = useState(false);
  const [productDeleteName, setProductDeleteName] = useState("");
  const [productDeleteBrand, setProductDeleteBrand] = useState(null);

  // brand
  const [brandId, setBrandId] = useState("");
  const [updateBrandOpen, setUpdateBrandOpen] = useState(false);

  const [brandDeleteModal, setBrandDeleteModal] = useState(false);
  const [brandDeleteName, setBrandDeleteName] = useState("");
  const [brandDeleteIcon, setBrandDeleteIcon] = useState(null);

  // latest arrivals
  const [updateLatestArrivalsModal, setUpdateLatestArrivalsModal] =
    useState(false);

  const [dltLatestArrivalsModal, setDltLatestArrivalsModal] = useState(false);

  const [dltLatestArrivalsName, setDltLatestArrivalsName] = useState("");
  const [dltLatestArrivalsCategory, setDltLatestArrivalsCategory] =
    useState("");
  const [dltLatestArrivalsDescription, setDltLatestArrivalsDescription] =
    useState("");
  const [dltLatestArrivalsImage, setDltLatestArrivalsImage] = useState(null);

  const [latestArrivalsId, setlatestArrivalsId] = useState("");
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

        productId,
        setProductId,

        discount,
        setDiscount,

        brands,
        setBrands,

        productUpdateModal,
        setProductUpdateModal,

        brandId,
        setBrandId,

        updateBrandOpen,
        setUpdateBrandOpen,

        productDltModal,
        setProductDltModal,

        productDeleteName,
        setProductDeleteName,

        productDeleteBrand,
        setProductDeleteBrand,

        brandDeleteModal,
        setBrandDeleteModal,

        brandDeleteName,
        setBrandDeleteName,

        brandDeleteIcon,
        setBrandDeleteIcon,

        updateLatestArrivalsModal,
        setUpdateLatestArrivalsModal,

        dltLatestArrivalsModal,
        setDltLatestArrivalsModal,

        latestArrivalsId,
        setlatestArrivalsId,

        dltLatestArrivalsImage,
        setDltLatestArrivalsImage,

        dltLatestArrivalsDescription,
        setDltLatestArrivalsDescription,

        dltLatestArrivalsCategory,
        setDltLatestArrivalsCategory,
        
        dltLatestArrivalsName,
        setDltLatestArrivalsName,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};

export const UseMe = () => useContext(MeContext);
