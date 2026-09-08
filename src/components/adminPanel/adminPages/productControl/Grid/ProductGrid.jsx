import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import {
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";
import axios from "axios";

const ProductGrid = () => {
  const [allproducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const getProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`
      );

      setAllProducts(getProductsApi.data.products);

      console.log(
        "get all products",
        getProductsApi.data.products
      );

      console.log(
        "IMAGE:",
        getProductsApi.data.products[0]?.variants?.[0]?.images?.[0]
      );
    } catch (error) {
      console.log("error in get products", error);
      console.log("Server response:", error.response?.data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getTotalStock = (product) => {
    if (!product.variants?.length) return 0;

    return product.variants.reduce((total, variant) => {
      if (!variant.sizes?.length) return total;

      const variantStock = variant.sizes.reduce(
        (sizeTotal, size) => {
          return sizeTotal + Number(size.stock || 0);
        },
        0
      );

      return total + variantStock;
    }, 0);
  };

  const getProductStatus = (stock) => {
    if (stock === 0) {
      return "Out of Stock";
    }

    if (stock <= 10) {
      return "Low Stock";
    }

    return "Available";
  };

  return (
    <div className="w-full">
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {allproducts.map((productData) => {
          const totalStock = getTotalStock(productData);

          const productStatus = getProductStatus(totalStock);

          const productImage =
            productData.variants?.[0]?.images?.[0];

          const totalVariants =
            productData.variants?.length || 0;

          const totalColors =
            productData.variants?.filter(
              (variant) => variant.color?.name
            ).length || 0;

          const sold = Number(productData.sold || 0);

          const revenue = Number(productData.revenue || 0);

          const inventoryWidth =
            totalStock === 0
              ? 0
              : Math.min(totalStock, 100);

          return (
            <div
              key={productData._id}
              className="
                group overflow-hidden rounded-2xl
                border border-white/[0.08]
                bg-[#0d0f11]
                shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/[0.16]
                hover:bg-[#101214]
              "
            >
              <div className="relative aspect-[4/4.7] overflow-hidden bg-[#151719]">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productData.name}
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700
                      ease-out group-hover:scale-105
                    "
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <FiPackage className="mx-auto mb-2 text-2xl text-[#3d4248]" />

                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#555b63]">
                        No Image
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute left-3 top-3">
                  <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                    {productData.category}
                  </span>
                </div>

                <div className="absolute right-3 top-3">
                  <span
                    className={`
                      rounded-full border px-2.5 py-1
                      text-[9px] backdrop-blur-md
                      ${
                        productStatus === "Available"
                          ? "border-emerald-400/20 bg-black/60 text-emerald-400"
                          : productStatus === "Low Stock"
                            ? "border-yellow-400/20 bg-black/60 text-yellow-400"
                            : "border-red-400/20 bg-black/60 text-red-400"
                      }
                    `}
                  >
                    {productStatus}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#555b63]">
                      {productData.category}
                    </p>

                    <h4 className="mt-1.5 truncate text-sm font-medium text-[#e1e3e5]">
                      {productData.name}
                    </h4>

                    <p className="mt-1 truncate text-[9px] text-[#555b63]">
                      {productData.sku || "ME Collection"}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="whitespace-nowrap text-sm font-semibold text-white">
                      ₹
                      {Number(
                        productData.price || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    {productData.realPrice && (
                      <p className="mt-1 whitespace-nowrap text-[9px] text-[#555b63] line-through">
                        ₹
                        {Number(
                          productData.realPrice
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 border-b border-white/[0.06] pb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md border border-[#25282d] bg-[#111316] px-2.5 py-1.5 text-[9px] text-[#686e75]">
                      {totalColors} Colors
                    </span>

                    <span className="rounded-md border border-[#25282d] bg-[#111316] px-2.5 py-1.5 text-[9px] text-[#686e75]">
                      {totalVariants} Variants
                    </span>

                    <span
                      className={`
                        rounded-md border px-2.5 py-1.5 text-[9px]
                        ${
                          productStatus === "Available"
                            ? "border-green-400/10 bg-green-400/[0.05] text-green-400"
                            : productStatus === "Low Stock"
                              ? "border-yellow-400/10 bg-yellow-400/[0.05] text-yellow-400"
                              : "border-red-400/10 bg-red-400/[0.05] text-red-400"
                        }
                      `}
                    >
                      {productStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3">
                  <div className="flex flex-col items-center justify-center border-r border-white/[0.06]">
                    <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                      <FiPackage className="text-[11px]" />

                      <span className="text-[8px] uppercase tracking-[0.14em]">
                        Stock
                      </span>
                    </div>

                    <h4
                      className={`
                        mt-1 text-xs font-medium
                        ${
                          totalStock === 0
                            ? "text-red-400"
                            : totalStock <= 10
                              ? "text-yellow-400"
                              : "text-[#9da2a8]"
                        }
                      `}
                    >
                      {totalStock}
                    </h4>
                  </div>

                  <div className="flex flex-col items-center justify-center border-r border-white/[0.06]">
                    <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                      <FiShoppingBag className="text-[11px]" />

                      <span className="text-[8px] uppercase tracking-[0.14em]">
                        Sold
                      </span>
                    </div>

                    <h4 className="mt-1 text-xs font-medium text-[#9da2a8]">
                      {sold}
                    </h4>
                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center">
                    <div className="mb-1 flex items-center gap-1.5 text-[#4d535a]">
                      <FiTrendingUp className="text-[11px]" />

                      <span className="text-[8px] uppercase tracking-[0.14em]">
                        Revenue
                      </span>
                    </div>

                    <h4 className="mt-1 truncate text-xs font-medium text-[#9da2a8]">
                      ₹{revenue.toLocaleString("en-IN")}
                    </h4>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#4d535a]">
                      Inventory
                    </p>

                    <p className="text-[8px] text-[#555b63]">
                      {totalStock} units
                    </p>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-[#24272b]">
                    <div
                      className={`
                        h-full rounded-full
                        transition-all duration-500
                        ${
                          totalStock === 0
                            ? "bg-red-400"
                            : totalStock <= 10
                              ? "bg-yellow-400"
                              : "bg-white"
                        }
                      `}
                      style={{
                        width: `${inventoryWidth}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="
                      flex h-9 items-center
                      justify-center gap-2
                      rounded-lg border
                      border-white/[0.08]
                      bg-transparent
                      text-[10px] font-medium
                      text-[#777d84]
                      transition-all duration-200
                      hover:border-white/[0.15]
                      hover:bg-white/[0.04]
                      hover:text-white
                    "
                  >
                    <FaEye className="text-[10px]" />

                    <p>View</p>
                  </button>

                  <button
                    type="button"
                    className="
                      flex h-9 items-center
                      justify-center gap-2
                      rounded-lg
                      bg-[#181b1f]
                      text-[10px] font-medium
                      text-[#aeb2b7]
                      transition-all duration-200
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    <CiEdit className="text-[14px]" />

                    <p>Edit</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;