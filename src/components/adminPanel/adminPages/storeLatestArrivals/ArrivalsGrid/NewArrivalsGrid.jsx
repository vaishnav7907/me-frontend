import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FiPackage, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { UseMe } from "../../../../context/Meprovider";
import axios from "axios";

const NewArrivalsGrid = () => {
  
  const [latestArrivals, setLatestArrivals] = useState([]);
  const getLatestArrivals = async () => {
    try {
      const latestArrivalsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/NewArrivals`,
      );
      setLatestArrivals(latestArrivalsApi.data.products);
      console.log("latest arrivals", latestArrivalsApi.data.products);
    } catch (error) {
      console.log("error in latest arrivals", error);
    }
  };

  useEffect(() => {
    getLatestArrivals();
  }, []);

  const getDiscount = (product) => {
    const price = Number(product?.price) || 0;
    const realPrice = Number(product?.realPrice) || 0;

    if (!price || !realPrice || realPrice <= price) {
      return 0;
    }

    return Math.round(((realPrice-price)/realPrice)*100)
  };

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {latestArrivals.map((productData) => (
          <div
            key={productData._id}
            className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f11] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#101214]"
          >
            {/* Image */}
            <div className="relative aspect-[4/4.7] overflow-hidden bg-[#151719]">
              <img
                src={productData.variants?.[0]?.images?.[0]}
                alt={productData.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Image Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Category Badge */}
              <div className="absolute left-3 top-3">
                <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                  {productData.category}
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute right-3 top-3">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] backdrop-blur-md ${
                    productData === "status"
                      ? "border-white/10 bg-black/60 text-white/70"
                      : "border-red-400/10 bg-red-400/[0.08] text-red-400"
                  }`}
                >
                  {productData.status}
                </span>
              </div>
            </div>

            {/* Product Content */}
            <div className="p-4">
              {/* Product Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#555b63]">
                    {productData.category}
                  </p>

                  <h4 className="mt-1.5 truncate text-sm font-medium text-[#e1e3e5]">
                    {productData.category}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#555b63]">
                    {productData.sku}
                  </p>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <p className="whitespace-nowrap text-sm font-semibold text-white">
                    ₹{productData.price}
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[9px] text-[#555b63] line-through">
                    ₹{productData.realPrice}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 border-b border-white/[0.06] pb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-[#25282d] bg-[#111316] px-2.5 py-1.5 text-[9px] text-[#686e75]">
                    Colors
                  </span>

                  <span className="rounded-md border border-[#25282d] bg-[#111316] px-2.5 py-1.5 text-[9px] text-[#686e75]">
                    {productData.brandName}
                  </span>

                  <span className="rounded-md border border-green-400/10 bg-green-400/[0.05] px-2.5 py-1.5 text-[9px] text-green-400">
                  {getDiscount(productData)}  % OFF
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {/* Stock */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                    <FiPackage className="text-[11px]" />
                    <span className="text-[8px] uppercase tracking-[0.14em]">
                      Stock
                    </span>
                  </div>

                  <h4 className="mt-1 text-xs font-medium text-[#9da2a8]">
                    {productData.brandName}
                  </h4>
                </div>

                {/* Sold */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                    <FiShoppingBag className="text-[11px]" />
                    <span className="text-[8px] uppercase tracking-[0.14em]">
                      Sold
                    </span>
                  </div>

                  <h4 className="mt-1 text-xs font-medium text-[#9da2a8]">
                    {productData.brandName}
                  </h4>
                </div>

                {/* Revenue */}
                <div className="min-w-0 flex flex-col items-center justify-center">
                  <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                    <FiTrendingUp className="text-[11px]" />
                    <span className="text-[8px] uppercase tracking-[0.14em]">
                      Revenue
                    </span>
                  </div>

                  <h4 className="mt-1 truncate text-xs font-medium text-[#9da2a8]">
                    ₹123
                  </h4>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#4d535a]">
                    Inventory
                  </p>

                  <p className="text-[8px] text-[#555b63]">
                    {productData.brandName} units
                  </p>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-[#24272b]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      productData === "status "
                        ? "w-0"
                        : productData.status === "Low Stock"
                          ? "w-[25%] bg-amber-400"
                          : "w-[75%] bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex h-9 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent text-[10px] font-medium text-[#777d84] transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.04] hover:text-white"
                >
                  <FaEye className="text-[10px]" />
                  <p>View</p>
                </button>

                <button
                  type="button"
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#181b1f] text-[10px] font-medium text-[#aeb2b7] transition-all duration-200 hover:bg-white hover:text-black"
                >
                  <CiEdit className="text-[14px]" />
                  <p>Edit</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsGrid;
