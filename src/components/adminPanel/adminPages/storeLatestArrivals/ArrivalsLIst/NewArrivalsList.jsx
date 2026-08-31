import React, { useState } from "react";
import {
  useTable,
  tableFeatures,
  rowSelectionFeature,
} from "@tanstack/react-table";
import { FiChevronDown } from "react-icons/fi";
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
const NewArrivalsList = () => {
  const listProductss = [
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

  const columns = [
    { id: "checkBox", header: "" },
    { accessorKey: "product", header: "Product" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "variants", header: "Variants" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "sold", header: "Sold" },
    { accessorKey: "revenue", header: "Revenue" },
    { accessorKey: "status", header: "Status" },
    { id: "action", header: "" },
  ];

  // pagination
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPage = Math.ceil(listProductss.length / perPage);
  const startIndex = (page - 1) * perPage;
  const currentProducts = listProductss.slice(startIndex, startIndex + perPage);

  const table = useTable({
    data: currentProducts,
    columns,
    features: tableFeatures({ rowSelectionFeature }),
  });

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-2xl shadow-black/20">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-white/[0.07] bg-[#121212]"
              >
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`
                      whitespace-nowrap px-5 py-4
                      text-[10px] font-semibold uppercase
                      tracking-[0.16em] text-gray-500
                      ${index === 0 ? "text-left" : "text-center"}
                    `}
                  >
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="
                  group border-b border-white/[0.055]
                  transition-all duration-200
                  hover:bg-white/[0.025]
                "
              >
                {row.getAllCells().map((cell) => {
                  const value = cell.getValue();

                  return (
                    <td
                      key={cell.id}
                      className={`
                        px-5 py-4 text-sm
                        ${
                          cell.column.id === "product"
                            ? "text-left"
                            : "text-center"
                        }
                      `}
                    >
                      {/* PRODUCT */}

                      {cell.column.id === "checkBox" ? (
                        <div>
                          <input
                            type="checkbox"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onChange={row.getToggleSelectedHandler()}
                            className="w-4 h-4 cursor-pointer accent-white"
                          />
                        </div>
                      ) : cell.column.id === "product" ? (
                        <div className="flex items-center gap-4">
                          {/* Image */}
                          <div
                            className="
                              relative h-14 w-14 shrink-0
                              overflow-hidden rounded-xl
                              border border-white/[0.08]
                              bg-[#171717]
                            "
                          >
                            <img
                              src={value}
                              alt=""
                              className="
                                h-full w-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110
                              "
                            />

                            {/* Image overlay */}
                            <div
                              className="
                                absolute inset-0
                                bg-black/0
                                transition
                                group-hover:bg-black/10
                              "
                            />
                          </div>

                          {/* Product information */}
                          <div className="min-w-0">
                            <p
                              className="
                              truncate text-sm font-medium
                              text-white
                              transition-colors
                              group-hover:text-gray-200
                            "
                            >
                              Product {row.original.id}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[11px] text-gray-600">
                                SKU
                              </span>

                              <span className="text-[11px] text-gray-500">
                                ME-{String(row.original.id).padStart(4, "0")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : cell.column.id === "category" ? (
                        /* CATEGORY */
                        <span
                          className="
                            inline-flex items-center
                            rounded-md border border-white/[0.07]
                            bg-white/[0.025]
                            px-2.5 py-1
                            text-xs text-gray-400
                          "
                        >
                          {value}
                        </span>
                      ) : cell.column.id === "price" ? (
                        /* PRICE */
                        <span className="font-medium text-white">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      ) : cell.column.id === "variants" ? (
                        /* VARIANTS */
                        <span className="text-gray-400">
                          {value}
                          <span className="ml-1 text-gray-600">variants</span>
                        </span>
                      ) : cell.column.id === "stock" ? (
                        /* STOCK */
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={`
                              font-medium
                              ${
                                value === 0
                                  ? "text-red-400"
                                  : value <= 10
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                              }
                            `}
                          >
                            {value}
                          </span>

                          {/* Stock bar */}
                          <div className="h-1 w-12 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className={`
                                h-full rounded-full transition-all
                                ${
                                  value === 0
                                    ? "w-0 bg-red-400"
                                    : value <= 10
                                      ? "w-1/4 bg-yellow-400"
                                      : value <= 30
                                        ? "w-1/2 bg-gray-400"
                                        : "w-full bg-white"
                                }
                              `}
                            />
                          </div>
                        </div>
                      ) : cell.column.id === "sold" ? (
                        /* SOLD */
                        <span className="font-medium text-gray-300">
                          {value}
                        </span>
                      ) : cell.column.id === "revenue" ? (
                        /* REVENUE */
                        <span className="font-medium text-white">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      ) : cell.column.id === "status" ? (
                        /* STATUS */
                        <span
                          className={`
                            inline-flex items-center gap-2
                            rounded-full border
                            px-3 py-1.5
                            text-[11px] font-medium
                            ${
                              value === "In Stock"
                                ? "border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-400"
                                : value === "Low Stock"
                                  ? "border-yellow-500/15 bg-yellow-500/[0.08] text-yellow-400"
                                  : "border-red-500/15 bg-red-500/[0.08] text-red-400"
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5 w-1.5 rounded-full
                              ${
                                value === "In Stock"
                                  ? "bg-emerald-400"
                                  : value === "Low Stock"
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                              }
                            `}
                          />

                          {value}
                        </span>
                      ) : cell.column.id === "action" ? (
                        <button
                          type="button"
                          className="
          flex h-8 w-8 items-center justify-center
          rounded-lg
          text-gray-500
          transition
          hover:bg-white/[0.06]
          hover:text-white
        "
                        >
                          <BsThreeDots size={18} />
                        </button>
                      ) : (
                        <span className="text-gray-400">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
          flex items-center justify-between
          border-t border-white/[0.06]
          bg-[#101010]
          px-5 py-3.5
        "
      >
        {/* Results */}
        <p className="text-[11px] text-gray-600 flex gap-0.5">
          Showing
          <span className="text-gray-400">{startIndex + 1}</span>
          {"-"}
          <span className="text-gray-400">
            {Math.min(startIndex + perPage, listProductss.length)}
          </span>
          {"of"}
          <span className="text-gray-300">{listProductss.length}</span>
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg border border-white/[0.07]
              bg-white/[0.02]
              text-gray-500
              transition
              hover:border-white/[0.12]
              hover:bg-white/[0.06]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <RiArrowLeftWideLine size={18} />
          </button>

          <button
            className="
              flex h-8 min-w-8 items-center justify-center
              rounded-lg
              bg-white
              px-2.5
              text-xs font-semibold text-black
            "
          >
            {page}
          </button>

          <button
            className="
              ml-1 flex h-8 w-8 items-center justify-center
              rounded-lg border border-white/[0.07]
              bg-white/[0.02]
              text-gray-500
              transition
              hover:border-white/[0.12]
              hover:bg-white/[0.06]
              hover:text-white
            "
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPage}
          >
            <RiArrowRightWideLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsList;
