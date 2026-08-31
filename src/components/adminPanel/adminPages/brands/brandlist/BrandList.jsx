import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CiGrid41, CiCircleList } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { tableFeatures, useTable } from "@tanstack/react-table";
import BrandGrid from "../brandgrid/BrandGrid";
const BrandList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://logo.clearbit.com/nike.com",
      products: 24,
      status: "Active",
    },
    {
      id: 2,
      name: "Adidas",
      logo: "https://logo.clearbit.com/adidas.com",
      products: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "Puma",
      logo: "https://logo.clearbit.com/puma.com",
      products: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Levi's",
      logo: "https://logo.clearbit.com/levi.com",
      products: 12,
      status: "Active",
    },
    {
      id: 5,
      name: "Zara",
      logo: "https://logo.clearbit.com/zara.com",
      products: 21,
      status: "Active",
    },
    {
      id: 6,
      name: "H&M",
      logo: "https://logo.clearbit.com/hm.com",
      products: 9,
      status: "Inactive",
    },
    {
      id: 7,
      name: "Calvin Klein",
      logo: "https://logo.clearbit.com/calvinklein.com",
      products: 14,
      status: "Active",
    },
    {
      id: 8,
      name: "Tommy Hilfiger",
      logo: "https://logo.clearbit.com/tommy.com",
      products: 11,
      status: "Active",
    },
  ];
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );
  const columns = [
    { accessorKey: "name", header: "Brand" },
    { accessorKey: "products", header: "Products" },
    { accessorKey: "status", header: "Status" },
    { id: "ations", header: "" },
  ];
  const table = useTable({
    data: filteredBrands,
    columns,
    features: tableFeatures(),
  });
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#23272d] bg-[#111417] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
     
      {/* ================= TOOLBAR ================= */}
      <div className="flex items-center justify-between gap-4 border-b border-[#23272d] px-5 py-4">
        
        {/* Search */}
        <div className="relative w-full max-w-[340px]">
          
          <FiSearch
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className=" h-10 w-full rounded-xl border border-[#2a3037] bg-[#0c0f11] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-[#4b535d] focus:bg-[#0e1114] "
          />
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-[#2a3037] bg-[#15181b] p-1">
          
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={` flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-white text-black" : "text-gray-500 hover:bg-white/[0.05] hover:text-white"} `}
          >
            
            <CiGrid41 size={19} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={` flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-white text-black" : "text-gray-500 hover:bg-white/[0.05] hover:text-white"} `}
          >
           
            <CiCircleList size={19} />
          </button>
        </div>
      </div>
      {/* ================= LIST ================= */}
      {viewMode === "list" && (
        <div className="overflow-x-auto">
         
          <table className="w-full">
            
            {/* HEADER */}
            <thead>
             
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#23272d]">
                 
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className=" px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600 "
                    >
                     
                      {header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* BODY */}
            <tbody>
              
              {table.getRowModel().rows.map((tableRow) => (
                <tr
                  key={tableRow.id}
                  className=" border-b border-[#1d2126] transition duration-200 last:border-b-0 hover:bg-white/[0.018] "
                >
                
                  {tableRow.getAllCells().map((tableCell) => {
                    const value = tableCell.getValue();
                    return (
                      <td key={tableCell.id} className="px-5 py-4 align-middle">
                        
                        {tableCell.column.id === "name" && (
                          <div className="flex items-center gap-3.5">
                            
                            <div className=" flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2b3036] bg-white ">
                              
                              <img
                                src={tableRow.original.logo}
                                alt={tableRow.original.name}
                                className="h-8 w-8 object-contain"
                              />
                            </div>
                            
                            <div className="min-w-0">
                             
                              <p className="truncate text-sm font-medium text-white">
                                
                                {value}
                              </p>
                              
                            </div>
                          </div>
                        )}
                        {/* ================= PRODUCTS ================= */}
                        {tableCell.column.id === "products" && (
                          <div className="flex items-center">
                            
                            <span className="text-sm text-gray-300">
                              
                              {value}
                            </span>
                            <span className="ml-2 text-xs text-gray-600">
                              
                              products
                            </span>
                          </div>
                        )}
                        {/* ================= STATUS ================= */}
                        {tableCell.column.id === "status" && (
                          <span
                            className={` inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium ${value === "Active" ? "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400" : "border-gray-500/15 bg-gray-500/[0.06] text-gray-500"} `}
                          >
                           
                            <span
                              className={` h-1.5 w-1.5 rounded-full ${value === "Active" ? "bg-emerald-400" : "bg-gray-600"} `}
                            />
                            {value}
                          </span>
                        )}
                        {/* ================= ACTIONS ================= */}
                        {tableCell.column.id === "ations" && (
                          <div className="flex justify-end">
                           
                            <button
                              type="button"
                              title="More actions"
                              className=" flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-500 transition hover:border-[#30353c] hover:bg-white/[0.04] hover:text-white "
                            >
                              
                              <BsThreeDots size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {/* EMPTY STATE */}
          {table.getRowModel().rows.length === 0 && (
            <div className="flex min-h-[260px] items-center justify-center px-5">
              
              <div className="text-center">
              
                <p className="text-sm font-medium text-gray-400">
                  
                  No brands found
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  
                  Try searching with a different brand name.
                </p>
              </div>
            </div>
          )}
        </div>
      )}


      {viewMode==="grid" && (
        <div>
            <BrandGrid/>
        </div>
      )}
      
    </div>
  );
};
export default BrandList;
