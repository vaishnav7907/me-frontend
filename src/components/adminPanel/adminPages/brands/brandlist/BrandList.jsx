import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CiGrid41, CiCircleList } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { tableFeatures, useTable } from "@tanstack/react-table";
import BrandGrid from "../brandgrid/BrandGrid";
import axios from "axios";

const BrandList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");
  const [getBrands, setGetBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      const getBrandsFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand`,
      );

      setGetBrands(getBrandsFn.data.brand);

      console.log("get all brands", getBrandsFn.data.brand);
    } catch (error) {
      console.log("error in get brands", error);
      console.log("Server response:", error.response?.data);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const filteredBrands = getBrands.filter((brand) =>
    brand.brandName
      ?.toLowerCase()
      .includes(search.toLowerCase()),
  );

  const tableData = filteredBrands.map((brand) => {
    return {
      id: brand._id,
      name: brand.brandName,
      logo: brand.brandIcon?.url,
      brandImage: brand.brandImage?.url,
      products: brand.productCount,
      status: brand.status,
      slogan: brand.brandSlogan,
    };
  });

  const columns = [
    {
      id: "checkbox",
      header: "",
    },
    {
      accessorKey: "name",
      header: "Brand",
    },
    {
      accessorKey: "products",
      header: "Products",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "ations",
      header: "",
    },
  ];

  const table = useTable({
    data: tableData,
    columns,
    features: tableFeatures(),
  });

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#252a31] bg-[#111418] shadow-[0_15px_50px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#252a31] bg-[#121519] px-5 py-4">
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
            className="h-10 w-full rounded-xl border border-[#2a3037] bg-[#0c0f12] pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 transition-all duration-200 focus:border-[#4a5058] focus:bg-[#0e1114]"
          />
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-[#2a3037] bg-[#0c0f12] p-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <CiGrid41 size={19} />
          </button>

          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
              viewMode === "list"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <CiCircleList size={19} />
          </button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-[#252a31] bg-[#0f1215]"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-600"
                    >
                      {header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((tableRow) => (
                <tr
                  key={tableRow.id}
                  className="group border-b border-[#1e2329] transition-all duration-200 last:border-b-0 hover:bg-white/[0.025]"
                >
                  {tableRow.getAllCells().map((tableCell) => {
                    const value = tableCell.getValue();

                    return (
                      <td
                        key={tableCell.id}
                        className="px-5 py-4 align-middle"
                      >
                        {tableCell.column.id === "checkbox" && (
                          <div className="h-4 w-4 rounded border border-[#343a42]" />
                        )}

                        {tableCell.column.id === "name" && (
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#30353c] bg-white shadow-sm">
                              {tableRow.original.logo ? (
                                <img
                                  src={tableRow.original.logo}
                                  alt={tableRow.original.name}
                                  className="h-8 w-8 object-contain"
                                />
                              ) : (
                                <span className="text-[9px] text-gray-400">
                                  Logo
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-gray-100 transition-colors group-hover:text-white">
                                {value}
                              </p>

                              {tableRow.original.slogan && (
                                <p className="mt-0.5 max-w-[250px] truncate text-[10px] text-gray-600">
                                  {tableRow.original.slogan}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {tableCell.column.id === "products" && (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-300">
                              {value}
                            </span>

                            <span className="ml-2 text-xs text-gray-600">
                              products
                            </span>
                          </div>
                        )}

                        {tableCell.column.id === "status" && (
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                              value === "Active"
                                ? "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400"
                                : "border-gray-500/15 bg-gray-500/[0.06] text-gray-500"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                value === "Active"
                                  ? "bg-emerald-400"
                                  : "bg-gray-600"
                              }`}
                            />

                            {value}
                          </span>
                        )}

                        {tableCell.column.id === "ations" && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              title="More actions"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-500 transition-all duration-200 hover:border-[#30353c] hover:bg-white/[0.05] hover:text-white"
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

          {table.getRowModel().rows.length === 0 && (
            <div className="flex min-h-[280px] items-center justify-center px-5">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#292e35] bg-[#15191d]">
                  <FiSearch size={18} className="text-gray-600" />
                </div>

                <p className="text-sm font-medium text-gray-300">
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

      {viewMode === "grid" && (
        <BrandGrid brands={filteredBrands} />
      )}
    </div>
  );
};

export default BrandList;