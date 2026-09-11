import React, { useEffect, useState } from "react";
import {
  useTable,
  tableFeatures,
  rowSelectionFeature,
} from "@tanstack/react-table";
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
const NewArrivalsList = () => {
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
    return Math.round(((realPrice - price) / realPrice) * 100);
  };
  const getTotalStock = (product) => {
    if (!product.variants?.length) {
      return 0;
    }
    return product.variants.reduce((total, variant) => {
      if (!variant.sizes?.length) {
        return total;
      }
      return (
        total +
        variant.sizes.reduce(
          (sizeTotal, size) => sizeTotal + Number(size.stock || 0),
          0,
        )
      );
    }, 0);
  };
  const getProductStatus = (stock) => {
    if (stock === 0) {
      return "Out of Stock";
    }
    if (stock <= 10) {
      return "Low Stock";
    }
    return "In Stock";
  };
  const tableProducts = latestArrivals.map((products) => {
    const stock = getTotalStock(products);
    const price = Number(products.price || 0);
    return {
      id: products._id,
      name: products.name,
      category: products.category,
      price,
      variants: products.variants?.length || 0,
      stock,
      sold: Number(products.sold || 0),
      revenue: Number(products.revenue || 0),
      status: getProductStatus(stock),
    };
  });
  const columns = [
    { id: "checkBox", header: "" },
    { accessorKey: "name", header: "Product" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "variants", header: "Variants" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "sold", header: "Sold" },
    { accessorKey: "revenue", header: "Revenue" },
    { accessorKey: "status", header: "Status" },
    { id: "action", header: "" },
  ];
  const table = useTable({
    data: tableProducts,
    columns,
    features: tableFeatures({ rowSelectionFeature }),
  });
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-2xl shadow-black/20">
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
                    className={` whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 ${index === 0 ? "text-left" : "text-center"} `}
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
                className=" group border-b border-white/[0.055] transition-all duration-200 hover:bg-white/[0.025] "
              >
                {row.getAllCells().map((cell) => {
                  const value = cell.getValue();
                  return (
                    <td
                      key={cell.id}
                      className={` px-5 py-4 text-sm ${cell.column.id === "product" ? "text-left" : "text-center"} `}
                    >
                      {cell.column.id === "checkBox" ? (
                        <div>
                          <input
                            type="checkbox"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onChange={row.getToggleSelectedHandler()}
                            className="h-4 w-4 cursor-pointer accent-white"
                          />
                        </div>
                      ) : cell.column.id === "product" ? (
                        <div className="flex items-center gap-4">
                          <div className=" relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#171717] ">
                            <img
                              src={value}
                              alt=""
                              className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 "
                            />
                            <div className=" absolute inset-0 bg-black/0 transition group-hover:bg-black/10 " />{" "}
                          </div>
                          <div className="min-w-0">
                            <p className=" truncate text-sm font-medium text-white transition-colors group-hover:text-gray-200 ">
                              Product {row.original.id}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[11px] text-gray-600">
                                SKU
                              </span>
                              <span className="text-[11px] text-gray-500">
                                ME-
                                {String(row.original.id).padStart(4, "0")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : cell.column.id === "category" ? (
                        <span className=" inline-flex items-center rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-xs text-gray-400 ">
                          {value}
                        </span>
                      ) : cell.column.id === "price" ? (
                        <span className="font-medium text-white">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      ) : cell.column.id === "variants" ? (
                        <span className="text-gray-400">
                          {value}
                          <span className="ml-1 text-gray-600">variants</span>
                        </span>
                      ) : cell.column.id === "stock" ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={` font-medium ${value === 0 ? "text-red-400" : value <= 10 ? "text-yellow-400" : "text-gray-300"} `}
                          >
                            {value}
                          </span>
                          <div className="h-1 w-12 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className={` h-full rounded-full transition-all ${value === 0 ? "w-0 bg-red-400" : value <= 10 ? "w-1/4 bg-yellow-400" : value <= 30 ? "w-1/2 bg-gray-400" : "w-full bg-white"} `}
                            />
                          </div>
                        </div>
                      ) : cell.column.id === "sold" ? (
                        <span className="font-medium text-gray-300">
                          {value}
                        </span>
                      ) : cell.column.id === "revenue" ? (
                        <span className="font-medium text-white">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      ) : cell.column.id === "status" ? (
                        <span
                          className={` inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium ${value === "In Stock" ? "border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-400" : value === "Low Stock" ? "border-yellow-500/15 bg-yellow-500/[0.08] text-yellow-400" : "border-red-500/15 bg-red-500/[0.08] text-red-400"} `}
                        >
                          <span
                            className={` h-1.5 w-1.5 rounded-full ${value === "In Stock" ? "bg-emerald-400" : value === "Low Stock" ? "bg-yellow-400" : "bg-red-400"} `}
                          />
                          {value}
                        </span>
                      ) : cell.column.id === "action" ? (
                        <button
                          type="button"
                          className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white "
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
      <div className=" flex items-center justify-between border-t border-white/[0.06] bg-[#101010] px-5 py-3.5 ">
        <p className="flex gap-0.5 text-[11px] text-gray-600">
          Showing <span className="text-gray-400">777</span> {"-"}
          <span className="text-gray-400">44</span> {"of"}
          <span className="text-gray-300">{latestArrivals.length}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <button className=" flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 ">
            <RiArrowLeftWideLine size={18} />
          </button>
          <button className=" flex h-8 min-w-8 items-center justify-center rounded-lg bg-white px-2.5 text-xs font-semibold text-black ">
            2
          </button>
          <button className=" ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white ">
            <RiArrowRightWideLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewArrivalsList;
