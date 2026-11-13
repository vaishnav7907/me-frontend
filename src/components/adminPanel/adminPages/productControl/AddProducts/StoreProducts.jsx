import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { SiHackthebox } from "react-icons/si";
import { FiLayers, FiTrendingUp, FiSearch } from "react-icons/fi";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiGrid41, CiCircleList } from "react-icons/ci";
// import { FiRefreshCw } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import ProductList from "../list/ProductList";
import ProductGrid from "../Grid/ProductGrid";
import AddProductOverDisplay from "../productOverDisplay/AddProductOverDisplay";
import axios from "axios";
import ProductUpdateOverDisplay from "../productUpdateOverDisplay/ProductUpdateOverDisplay";

import ProductDeleteModal from "../productDeleteModal/ProductDeleteModal";
import { UseMe } from "../../../../context/Meprovider";
const StoreProducts = () => {
  const statusFilters = ["All", "Active", "Inactive", "Low Stock"];
  const [gridListView, setGridListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  const {
    productUpdateModal,
    setProductUpdateModal,
    productDltModal,
    setProductDltModal,
    bulkDeleteProducts,
    setBulkDeleteProducts,
  } = UseMe();

  const stats = [
    {
      label: "Products",
      value: "48",
      description: "Total catalog",
      icon: SiHackthebox,
    },
    {
      label: "Inventory",
      value: "1,284",
      description: "Units available",
      icon: FiLayers,
    },
    {
      label: "Low Stock",
      value: "7",
      description: "Needs attention",
      icon: BiError,
    },
    {
      label: "Sales",
      value: "₹2.74L",
      description: "This month",
      icon: FiTrendingUp,
    },
  ];

  const [allOrders, setAllOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      const getAllOrdersFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAdminOrder`,
      );

      setAllOrders(getAllOrdersFn.data.orders || []);
      console.log("all orders", getAllOrdersFn.data.orders);
    } catch (error) {
      console.log("error in get all orders", error);
      alert(error.message);
    }
  };

  const getMonthlyOrders = allOrders.filter((order) => {
    const createdDate = new Date(order.createdAt);
    const today = new Date();

    return (
      order.orderStatus === "Delivered" &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // const pr
  const [getAllProducts, setGetAllProducts] = useState([]);
  const getProductsFn = async () => {
    try {
      const getProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`,
      );
      setGetAllProducts(getProductsApi.data.products || []);
      console.log("getProducts", getProductsApi.data.products);
    } catch (error) {
      console.log("error in get products", error);
      console.log("Server response:", error.response?.data);
    }
  };

  const lowStockProductLength = getAllProducts.filter((product) => {
    return product.variants?.some((variant) =>
      variant.sizes?.some((size) => size.stock < 10),
    );
  }).length;

  const categories = [
    { name: "All" },
    { name: "Shirts" },
    { name: "T-Shirts" },
    { name: "Pants" },
    { name: "Jackets" },
    { name: "Innerwear" },
  ];

  const filteredProducts = getAllProducts.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch =
      item.name?.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.brand?.brandName
        ?.toLowerCase()
        .includes(search.trim().toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.trim().toLowerCase());

    const matchesStatus =
      activeStatus === "All" ||
      (activeStatus === "Low Stock"
        ? item.variants?.some((variant) =>
            variant.sizes?.some((size) => size.stock < 10),
          )
        : item.status === activeStatus);

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const handleBulkDelete = async () => {
    if (bulkDeleteProducts.length === 0) return;

    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete ${bulkDeleteProducts.length} selected products? This action cannot be undone.`,
    // );

    // if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Me/deleteMultipleProducts`,
        {
          data: {
            productIds: bulkDeleteProducts,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        alert(response.data.message);

        setBulkDeleteProducts([]);
setBulkDeleteModal(false)
        await getProductsFn();
      }
    } catch (error) {
      console.log("Bulk delete error:", error);

      alert(
        error.response?.data?.message || "Failed to delete selected products",
      );
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getProductsFn();
    await getAllOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    getProductsFn();
    getAllOrders();
  }, []);
  return (
    <div className="min-h-screen bg-[#0B0D10] text-white">
      <div className="px-6 lg:px-8 pt-7">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              Store / Products
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Products
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Manage your products, variants and inventory.
            </p>
          </div>
          <button
            onClick={() => setShowAddProduct(true)}
            className="h-10 px-4 rounded-lg bg-white text-black flex items-center justify-center gap-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <IoAdd size={19} /> Add Product
          </button>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-8">
          <div className="bg-[#101318] border border-[#242932] rounded-xl px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Products
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {getAllProducts.length}
                </p>
                <p className="mt-1 text-[11px] text-neutral-600">
                  Total catalog
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <SiHackthebox size={16} className="text-neutral-500" />
              </div>
            </div>
          </div>
          <div className="bg-[#101318] border border-[#242932] rounded-xl px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Products
                </p>
                <p className="mt-2 text-xl font-semibold text-white">48</p>
                <p className="mt-1 text-[11px] text-neutral-600">
                  Total catalog
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <SiHackthebox size={16} className="text-neutral-500" />
              </div>
            </div>
          </div>
          <div className="bg-[#101318] border border-[#242932] rounded-xl px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Low Stock
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {lowStockProductLength}
                </p>
                <p className="mt-1 text-[11px] text-neutral-600">
                  Needs attention
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <BiError size={16} className="text-neutral-500" />
              </div>
            </div>
          </div>
          <div className="bg-[#101318] border border-[#242932] rounded-xl px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Sales
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {getMonthlyOrders}
                </p>
                <p className="mt-1 text-[11px] text-neutral-600">This month</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <FiTrendingUp size={16} className="text-neutral-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 mt-8">
        <div className="border-b border-[#242932] overflow-x-auto">
          <div className="flex items-center gap-7 min-w-max">
            {categories.map((category) => {
              const active = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative flex items-center gap-2 pb-3 text-sm transition-colors ${
                    active
                      ? "text-white"
                      : "text-neutral-600 hover:text-neutral-300"
                  }`}
                >
                  <span>{category.name}</span>

                  <span
                    className={`text-[10px] ${
                      active ? "text-neutral-400" : "text-neutral-700"
                    }`}
                  >
                    {category.name === "All"
                      ? getAllProducts.length
                      : getAllProducts.filter(
                          (item) => item.category === category.name,
                        ).length}
                  </span>

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 py-5">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
          <div className="w-full xl:w-80 h-10 px-3 rounded-lg bg-[#101318] border border-[#242932] flex items-center gap-2">
            <FiSearch size={17} className="text-neutral-600 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-neutral-600"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {statusFilters.map((filter) => {
              const active = activeStatus === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveStatus(filter)}
                  className={`h-9 px-3.5 rounded-lg border text-xs whitespace-nowrap transition-all ${active ? "bg-white text-black border-white" : "bg-[#101318] text-neutral-500 border-[#242932] hover:text-white hover:border-[#343941]"}`}
                >
                  {filter}
                </button>
              );
            })}
            <button className="h-9 px-3.5 rounded-lg bg-[#101318] border border-[#242932] text-xs text-neutral-500 flex items-center gap-2 whitespace-nowrap hover:text-white hover:border-[#343941] transition-all">
              Newest <RiArrowDownSLine size={16} />
            </button>
            <div className="flex items-center gap-1 h-9 p-1 rounded-lg bg-[#101318] border border-[#242932]">
              <button
                onClick={() => setGridListView(false)}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${!gridListView ? "bg-white/[0.1] text-white" : "text-neutral-600 hover:text-neutral-300"}`}
              >
                <CiGrid41 size={18} />
              </button>
              <button
                onClick={() => setGridListView(true)}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${gridListView ? "bg-white/[0.1] text-white" : "text-neutral-600 hover:text-neutral-300"}`}
              >
                <CiCircleList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 pb-10">
        <div className="flex justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {activeCategory === "All" ? "All Products" : activeCategory}
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                {filteredProducts.length} products
                {activeCategory !== "All" && ` in ${activeCategory}`}
              </p>
            </div>
            <p className="text-xs text-neutral-600">
              {activeStatus !== "All" && `${activeStatus} products`}
            </p>
          </div>

          <div className="flex gap-3 ">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 h-10 text-sm text-gray-400 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
            >
              <FiRefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={() => setBulkDeleteModal(true)}
              disabled={bulkDeleteProducts.length === 0}
              className="flex items-center gap-2 px-3 h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiTrash2 size={16} />
              Bulk Delete
              {bulkDeleteProducts.length > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-xs">
                  {bulkDeleteProducts.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {!gridListView ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
      {showAddProduct && (
        <AddProductOverDisplay onClose={() => setShowAddProduct(false)} />
      )}

      {productUpdateModal && (
        <ProductUpdateOverDisplay
          closeUpdate={() => setProductUpdateModal(false)}
        />
      )}

      {productDltModal && (
        <ProductDeleteModal
          oncloseDeleteModal={() => setProductDltModal(false)}
        />
      )}
      {bulkDeleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
          
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111317] p-7 shadow-2xl"
          >
            <button
              onClick={()=>setBulkDeleteModal(false)}
              
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-white/[0.06] hover:text-white"
            >
              <FiX size={19} />
            </button>

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <FiTrash2 size={24} className="text-red-400" />
            </div>

            {/* Heading */}
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                Product Management
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Delete Products
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Are you sure you want to delete these selected products? This
                action cannot be undone.
              </p>
            </div>

            {/* Selected products */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
              <div>
                <p className="text-xs text-neutral-500">Selected products</p>

                <p className="mt-1 text-sm font-medium text-white">
                  Products to delete
                </p>
              </div>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-red-500/10 px-3 text-sm font-semibold text-red-400">
                {bulkDeleteProducts.length}
              </span>
            </div>

            {/* Warning */}
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/[0.04] p-3">
              <FiAlertTriangle
                className="mt-0.5 shrink-0 text-yellow-500"
                size={16}
              />

              <p className="text-xs leading-5 text-neutral-400">
                Permanently deleted products cannot be recovered. Make sure you
                have selected the correct products.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={()=>setBulkDeleteModal(false)}
                
                className="h-11 flex-1 rounded-lg border border-white/[0.09] bg-white/[0.03] text-sm font-medium text-neutral-400 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={ bulkDeleteProducts.length === 0}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 size={15} />
                {handleBulkDelete ? "Deleting..." : "Delete Products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StoreProducts;
