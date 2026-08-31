import React from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FiPackage, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

const NewArrivalsGrid = () => {
  const gridProductss = [
    {
      id: 1,
      product:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      category: "Shirts",
      price: 2499,
      variants: 4,
      stock: 42,
      sold: 128,
      revenue: 319872,
      status: "In Stock",
    },
    {
      id: 2,
      product:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      category: "Shirts",
      price: 2999,
      variants: 3,
      stock: 25,
      sold: 96,
      revenue: 287904,
      status: "In Stock",
    },
    {
      id: 3,
      product:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
      category: "T-Shirts",
      price: 1499,
      variants: 5,
      stock: 67,
      sold: 215,
      revenue: 322285,
      status: "In Stock",
    },
    {
      id: 4,
      product:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: "T-Shirts",
      price: 1299,
      variants: 4,
      stock: 8,
      sold: 189,
      revenue: 245511,
      status: "Low Stock",
    },
    {
      id: 5,
      product:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400",
      category: "Pants",
      price: 3499,
      variants: 4,
      stock: 31,
      sold: 74,
      revenue: 258926,
      status: "In Stock",
    },
    {
      id: 6,
      product:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      category: "Pants",
      price: 3999,
      variants: 3,
      stock: 14,
      sold: 63,
      revenue: 251937,
      status: "Low Stock",
    },
    {
      id: 7,
      product:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      category: "Jackets",
      price: 6999,
      variants: 3,
      stock: 19,
      sold: 41,
      revenue: 286959,
      status: "In Stock",
    },
    {
      id: 8,
      product:
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400",
      category: "Jackets",
      price: 5999,
      variants: 2,
      stock: 5,
      sold: 37,
      revenue: 221963,
      status: "Low Stock",
    },
    {
      id: 9,
      product:
        "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400",
      category: "Hoodies",
      price: 2499,
      variants: 5,
      stock: 53,
      sold: 156,
      revenue: 389844,
      status: "In Stock",
    },
    {
      id: 10,
      product:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400",
      category: "Hoodies",
      price: 2799,
      variants: 4,
      stock: 0,
      sold: 112,
      revenue: 313488,
      status: "Out of Stock",
    },
    {
      id: 11,
      product:
        "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400",
      category: "Shirts",
      price: 2699,
      variants: 3,
      stock: 38,
      sold: 87,
      revenue: 234813,
      status: "In Stock",
    },
    {
      id: 12,
      product:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400",
      category: "Shirts",
      price: 3199,
      variants: 4,
      stock: 12,
      sold: 58,
      revenue: 185542,
      status: "Low Stock",
    },
    {
      id: 13,
      product:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      category: "T-Shirts",
      price: 1599,
      variants: 6,
      stock: 72,
      sold: 243,
      revenue: 388557,
      status: "In Stock",
    },
    {
      id: 14,
      product:
        "https://images.unsplash.com/photo-1506629905607-d9b1b7a3f7f6?w=400",
      category: "Pants",
      price: 3299,
      variants: 3,
      stock: 21,
      sold: 91,
      revenue: 300209,
      status: "In Stock",
    },
    {
      id: 15,
      product:
        "https://images.unsplash.com/photo-1551028919-ac66f9b6f5a6?w=400",
      category: "Jackets",
      price: 7999,
      variants: 2,
      stock: 7,
      sold: 29,
      revenue: 231971,
      status: "Low Stock",
    },
    {
      id: 16,
      product:
        "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400",
      category: "Hoodies",
      price: 2299,
      variants: 5,
      stock: 44,
      sold: 134,
      revenue: 307866,
      status: "In Stock",
    },
    {
      id: 17,
      product:
        "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=400",
      category: "T-Shirts",
      price: 999,
      variants: 3,
      stock: 3,
      sold: 276,
      revenue: 275724,
      status: "Low Stock",
    },
    {
      id: 18,
      product:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      category: "Pants",
      price: 2899,
      variants: 4,
      stock: 29,
      sold: 68,
      revenue: 197132,
      status: "In Stock",
    },
    {
      id: 19,
      product:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=400",
      category: "Jackets",
      price: 6499,
      variants: 3,
      stock: 0,
      sold: 52,
      revenue: 337948,
      status: "Out of Stock",
    },
    {
      id: 20,
      product:
        "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400",
      category: "Hoodies",
      price: 2999,
      variants: 4,
      stock: 36,
      sold: 103,
      revenue: 308897,
      status: "In Stock",
    },
  ];
  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {gridProductss.map((productData) => (
          <div
            key={productData.id}
            className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f11] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#101214]"
          >
            {/* Image */}
            <div className="relative aspect-[4/4.7] overflow-hidden bg-[#151719]">
              <img
                src={productData.product}
                alt={productData.category}
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
                    productData.status === "In Stock"
                      ? "border-white/10 bg-black/60 text-white/70"
                      : productData.status === "Low Stock"
                        ? "border-amber-400/10 bg-amber-400/[0.08] text-amber-400"
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
                    ME Collection
                  </p>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <p className="whitespace-nowrap text-sm font-semibold text-white">
                    ₹{productData.price}
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[9px] text-[#555b63] line-through">
                    ₹{productData.price}
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
                    {productData.variants} Variants
                  </span>

                  <span className="rounded-md border border-green-400/10 bg-green-400/[0.05] px-2.5 py-1.5 text-[9px] text-green-400">
                    % OFF
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
                    {productData.stock}
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
                    {productData.sold}
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
                    ₹{productData.revenue.toLocaleString("en-IN")}
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
                    {productData.stock} units
                  </p>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-[#24272b]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      productData.status === "Out of Stock"
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
