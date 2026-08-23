import React from "react";
import { useTable, tableFeatures } from "@tanstack/react-table";
import { FiChevronDown } from "react-icons/fi";
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";
const ProductList = () => {
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
    { accessorKey: "product", header: "Product" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "variants", header: "Variants" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "sold", header: "Sold" },
    { accessorKey: "revenue", header: "Revenue" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useTable({
    data: listProductss,
    columns,
    features: tableFeatures(),
  });
  return (
    <div>
      <div className=" text-white ">
        <table className="w-full border border-white/20 border-collapse">
          <thead className="  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-[#242424] bg-[#151515]"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-4 text-center text-[11px] font-medium uppercase tracking-wider text-gray-500"
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
                className="group border-b border-[#202020] transition hover:bg-white/[0.025]"
              >
                {row.getAllCells().map((cell) => {
                  // <td key={cell.id} className="px-5 py-4 text-sm">{cell.getValue()}</td>
                  const value = cell.getValue();
                  return (
                    <td key={cell.id} className="px-5 py-4 text-sm text-center">
                      {/* product image */}

                      {cell.column.id === "product" ? (
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#292929] bg-[#1a1a1a]">
                            <img
                              src={value}
                              alt=""
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Product {row.original.id}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              ID {row.original.id}
                            </p>
                          </div>
                        </div>
                      ) : cell.column.id === "category" ? (
                        <span className="text-gray-400">{value}</span>
                      ) : cell.column.id === "price" ? (
                        <span className="font-medium text-white">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      ) : cell.column.id === "variants" ? (
                        <span className="text-gray-400">{value} variants</span>
                      ) : cell.column.id === "stock" ? (
                        <span>{value}</span>
                      ) : cell.column.id === "sold" ? (
                        <span>{value}</span>
                      ) : cell.column.id === "revenue" ? (
                        <span className="">{value}</span>
                      ) : cell.column.id === "status" ? (
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                            value === "In Stock"
                              ? "border-green-500/20 bg-green-500/10 text-green-400"
                              : value === "Low Stock"
                                ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                : "border-red-500/20 bg-red-500/10 text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              value === "In Stock"
                                ? "bg-green-400"
                                : value === "Low Stock"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                            }`}
                          />

                          {value}
                        </span>
                      ) : (
                        <span className="text-gray-400"> {value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-white py-3  flex justify-end">
          <div className="flex  items-center gap-3">
            <button>
              <RiArrowLeftWideLine size={25}/>
            </button>
            <span>1</span>
            <button>
              <RiArrowRightWideLine size={25}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
