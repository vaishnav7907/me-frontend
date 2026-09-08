import React, { useEffect, useState } from "react";
import { useTable, tableFeatures } from "@tanstack/react-table";
import { RiArrowRightWideLine, RiArrowLeftWideLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const getAllProducts = async () => {
    try {
      const getProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`,
      );
      const products = getProductsApi.data.products || [];
      setAllProducts(products);
      console.log("get all products", products);
      console.log("IMAGE:", products[0]?.variants?.[0]?.images?.[0]);
    } catch (error) {
      console.log("Error in get products:", error);
      console.log("Server response:", error.response?.data);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
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
  const getDiscount = (realPrice, price) => {
    const original = Number(realPrice || 0);
    const selling = Number(price || 0);
    if (original <= 0 || selling >= original) {
      return 0;
    }
    return Math.round(((original - selling) / original) * 100);
  };
  const tableData = allProducts.map((product) => {
    const stock = getTotalStock(product);
    const price = Number(product.price || 0);
    const realPrice = Number(product.realPrice || 0);
    const discount = getDiscount(realPrice, price);
    return {
      id: product._id,
      name: product.name || "Unnamed Product",
      image: product.variants?.[0]?.images?.[0] || "",
      category: product.category || "-",
      price,
      realPrice,
      discount,
      variants: product.variants?.length || 0,
      stock,
      sold: Number(product.sold || 0),
      revenue: Number(product.revenue || 0),
      status: getProductStatus(stock),
      sku: product.sku || "-",
    };
  });
  const totalPage = Math.max(1, Math.ceil(tableData.length / perPage));
  const startIndex = (page - 1) * perPage;
  const currentProducts = tableData.slice(startIndex, startIndex + perPage);
  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);
  const columns = [
    { id: "checkBox", header: "" },
    { accessorKey: "name", header: "Product" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "discount", header: "Discount" },
    { accessorKey: "variants", header: "Variants" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "sold", header: "Sold" },
    { accessorKey: "revenue", header: "Revenue" },
    { accessorKey: "status", header: "Status" },
    { id: "action", header: "" },
  ];
  const table = useTable({
    data: currentProducts,
    columns,
    features: tableFeatures(),
  });
  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id],
    );
  };
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-2xl shadow-black/20">
      {" "}
      <div className="">
        {" "}
        <table className="w-full  border-collapse">
          {" "}
          <thead>
            {" "}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-white/[0.07] bg-[#121212]"
              >
                {" "}
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={` whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 ${index === 1 ? "text-left" : "text-center"} `}
                  >
                    {" "}
                    {header.column.columnDef.header}{" "}
                  </th>
                ))}{" "}
              </tr>
            ))}{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const product = row.original;
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <tr
                    key={row.id}
                    className={` group border-b border-white/[0.055] transition-all duration-200 hover:bg-white/[0.025] ${isSelected ? "bg-white/[0.025]" : ""} `}
                  >
                    {" "}
                    {row.getAllCells().map((cell) => {
                      const value = cell.getValue();
                      return (
                        <td
                          key={cell.id}
                          className={` px-5 py-4 text-sm ${cell.column.id === "name" ? "text-left" : "text-center"} `}
                        >
                          {" "}
                          {cell.column.id === "checkBox" ? (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleProduct(product.id)}
                              className=" h-4 w-4 cursor-pointer accent-white "
                            />
                          ) : cell.column.id === "name" ? (
                            <div className="flex items-center gap-4">
                              {" "}
                              <div className=" relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#171717] ">
                                {" "}
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 "
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center">
                                    {" "}
                                    <span className=" text-[9px] uppercase tracking-[0.12em] text-gray-600 ">
                                      {" "}
                                      No Image{" "}
                                    </span>{" "}
                                  </div>
                                )}{" "}
                                <div className=" absolute inset-0 bg-black/0 transition group-hover:bg-black/10 " />{" "}
                              </div>{" "}
                              <div className="min-w-0">
                                {" "}
                                <p className=" max-w-[220px] truncate text-sm font-medium text-white transition-colors group-hover:text-gray-200 ">
                                  {" "}
                                  {product.name}{" "}
                                </p>{" "}
                                <div className="mt-1 flex items-center gap-2">
                                  {" "}
                                  <span className=" text-[11px] text-gray-600 ">
                                    {" "}
                                    SKU{" "}
                                  </span>{" "}
                                  <span className=" text-[11px] text-gray-500 ">
                                    {" "}
                                    {product.sku}{" "}
                                  </span>{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>
                          ) : cell.column.id === "category" ? (
                            <span className=" inline-flex items-center rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-xs text-gray-400 ">
                              {" "}
                              {value}{" "}
                            </span>
                          ) : cell.column.id === "price" ? (
                            <div className="flex flex-col items-center">
                              {" "}
                              <span className="font-medium text-white">
                                {" "}
                                ₹ {Number(value).toLocaleString("en-IN")}{" "}
                              </span>{" "}
                              {product.realPrice > product.price && (
                                <span className=" mt-0.5 text-[11px] text-gray-600 line-through ">
                                  {" "}
                                  ₹{" "}
                                  {Number(product.realPrice).toLocaleString(
                                    "en-IN",
                                  )}{" "}
                                </span>
                              )}{" "}
                            </div>
                          ) : cell.column.id === "discount" ? (
                            value > 0 ? (
                              <span className=" inline-flex items-center rounded-md border border-emerald-500/15 bg-emerald-500/[0.08] px-2.5 py-1 text-xs font-medium text-emerald-400 ">
                                {" "}
                                {value}% OFF{" "}
                              </span>
                            ) : (
                              <span className=" text-xs text-gray-600 ">
                                {" "}
                                —{" "}
                              </span>
                            )
                          ) : cell.column.id === "variants" ? (
                            <span className="text-gray-400">
                              {" "}
                              {value}{" "}
                              <span className="ml-1 text-gray-600">
                                {" "}
                                variants{" "}
                              </span>{" "}
                            </span>
                          ) : cell.column.id === "stock" ? (
                            <div className="flex flex-col items-center gap-1.5">
                              {" "}
                              <span
                                className={` font-medium ${value === 0 ? "text-red-400" : value <= 10 ? "text-yellow-400" : "text-gray-300"} `}
                              >
                                {" "}
                                {value}{" "}
                              </span>{" "}
                              <div className=" h-1 w-12 overflow-hidden rounded-full bg-white/[0.06] ">
                                {" "}
                                <div
                                  className={` h-full rounded-full transition-all ${value === 0 ? "w-0 bg-red-400" : value <= 10 ? "w-1/4 bg-yellow-400" : value <= 30 ? "w-1/2 bg-gray-400" : "w-full bg-white"} `}
                                />{" "}
                              </div>{" "}
                            </div>
                          ) : cell.column.id === "sold" ? (
                            <span className=" font-medium text-gray-300 ">
                              {" "}
                              {value}{" "}
                            </span>
                          ) : cell.column.id === "revenue" ? (
                            <span className=" font-medium text-white ">
                              {" "}
                              ₹ {Number(value).toLocaleString("en-IN")}{" "}
                            </span>
                          ) : cell.column.id === "status" ? (
                            <span
                              className={` inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium ${value === "In Stock" ? "border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-400" : value === "Low Stock" ? "border-yellow-500/15 bg-yellow-500/[0.08] text-yellow-400" : "border-red-500/15 bg-red-500/[0.08] text-red-400"} `}
                            >
                              {" "}
                              <span
                                className={` h-1.5 w-1.5 rounded-full ${value === "In Stock" ? "bg-emerald-400" : value === "Low Stock" ? "bg-yellow-400" : "bg-red-400"} `}
                              />{" "}
                              {value}{" "}
                            </span>
                          ) : cell.column.id === "action" ? (
                            <button
                              type="button"
                              className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white "
                            >
                              {" "}
                              <BsThreeDots size={18} />{" "}
                            </button>
                          ) : (
                            <span className="text-gray-400"> {value} </span>
                          )}{" "}
                        </td>
                      );
                    })}{" "}
                  </tr>
                );
              })
            ) : (
              <tr>
                {" "}
                <td colSpan={11} className="py-16 text-center">
                  {" "}
                  <p className="text-sm text-gray-600">
                    {" "}
                    No products found{" "}
                  </p>{" "}
                </td>{" "}
              </tr>
            )}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <div className=" flex items-center justify-between border-t border-white/[0.06] bg-[#101010] px-5 py-3.5 ">
        {" "}
        <p className="flex gap-1 text-[11px] text-gray-600">
          {" "}
          Showing{" "}
          <span className="text-gray-400">
            {" "}
            {tableData.length === 0 ? 0 : startIndex + 1}{" "}
          </span>{" "}
          -{" "}
          <span className="text-gray-400">
            {" "}
            {Math.min(startIndex + perPage, tableData.length)}{" "}
          </span>{" "}
          of <span className="text-gray-300"> {tableData.length} </span>{" "}
        </p>{" "}
        <div className="flex items-center gap-1.5">
          {" "}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className=" flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 "
          >
            {" "}
            <RiArrowLeftWideLine size={18} />{" "}
          </button>{" "}
          <button
            type="button"
            className=" flex h-8 min-w-8 items-center justify-center rounded-lg bg-white px-2.5 text-xs font-semibold text-black "
          >
            {" "}
            {page}{" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPage, prev + 1))}
            disabled={page === totalPage || tableData.length === 0}
            className=" ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 "
          >
            {" "}
            <RiArrowRightWideLine size={18} />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ProductList;
