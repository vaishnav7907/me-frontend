import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { SiHackthebox } from "react-icons/si";
import { FiLayers, FiTrendingUp, FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiGrid41, CiCircleList } from "react-icons/ci";
import ProductList from "../list/ProductList";
import ProductGrid from "../Grid/ProductGrid";
import AddProductOverDisplay from "../productOverDisplay/AddProductOverDisplay";
const StoreProducts = () => {
  const categories = [
    { name: "All", item: 48 },
    { name: "Shirts", item: 12 },
    { name: "T-Shirts", item: 10 },
    { name: "Pants", item: 9 },
    { name: "Jackets", item: 8 },
    { name: "Innerwear", item: 9 },
  ];
  const statusFilters = ["All", "Active", "Inactive", "Low Stock"];
  const [gridListView, setGridListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
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
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-[#101318] border border-[#242932] rounded-xl px-4 py-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      {stat.description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Icon size={16} className="text-neutral-500" />
                  </div>
                </div>
              </div>
            );
          })}
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
                  className={`relative flex items-center gap-2 pb-3 text-sm transition-colors ${active ? "text-white" : "text-neutral-600 hover:text-neutral-300"}`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`text-[10px] ${active ? "text-neutral-400" : "text-neutral-700"}`}
                  >
                    {category.item}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${active ? "w-full" : "w-0"}`}
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h2>
            <p className="text-xs text-neutral-600 mt-1">
              {activeCategory === "All"
                ? "48 products in your catalog"
                : `${activeCategory} collection`}
            </p>
          </div>
          <p className="text-xs text-neutral-600">
            {activeStatus !== "All" && `${activeStatus} products`}
          </p>
        </div>
        {!gridListView ? <ProductGrid /> : <ProductList />}
      </div>
      {showAddProduct && (
        <AddProductOverDisplay onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
};
export default StoreProducts;
