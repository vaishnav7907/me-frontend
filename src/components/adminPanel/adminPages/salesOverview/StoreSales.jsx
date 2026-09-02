import React from "react";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiDownload,
  FiChevronDown,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { FiArrowDownRight } from "react-icons/fi";
// import { MdOutlineArrowOutward } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import AnalyticsCompleteChart from "../charts/AnalyticsCompleteChart";
import { tableFeatures, useTable } from "@tanstack/react-table";

const StoreSales = () => {
  const salesData = [
    { month: "Jan", revenue: 42000, profit: 17000 },
    { month: "Feb", revenue: 51000, profit: 22000 },
    { month: "Mar", revenue: 47000, profit: 19000 },
    { month: "Apr", revenue: 63000, profit: 28000 },
    { month: "May", revenue: 72000, profit: 33000 },
    { month: "Jun", revenue: 68000, profit: 30000 },
    { month: "Jul", revenue: 85000, profit: 41000 },
    { month: "Aug", revenue: 94000, profit: 47000 },
  ];

  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      category: "Shirts",
      sold: 1240,
      revenue: 97960,
      profit: 31200,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Pants",
      sold: 1085,
      revenue: 107415,
      profit: 35800,
    },
    {
      id: 3,
      name: "Oversized T-Shirt",
      category: "T-Shirts",
      sold: 980,
      revenue: 44100,
      profit: 16400,
    },
    {
      id: 4,
      name: "Essential Hoodie",
      category: "T-Shirts",
      sold: 865,
      revenue: 82175,
      profit: 28900,
    },
    {
      id: 5,
      name: "Tailored Blazer",
      category: "Jackets",
      sold: 720,
      revenue: 128880,
      profit: 42700,
    },
    {
      id: 6,
      name: "Leather Jacket",
      category: "Jackets",
      sold: 615,
      revenue: 122385,
      profit: 39600,
    },
    {
      id: 7,
      name: "Classic Chinos",
      category: "Pants",
      sold: 580,
      revenue: 57420,
      profit: 18900,
    },
    {
      id: 8,
      name: "Premium Polo",
      category: "Shirts",
      sold: 510,
      revenue: 40290,
      profit: 14100,
    },
  ];
  const ageGroups = [
    {
      age: "18–24",
      customers: 420,
      orders: 620,
      revenue: 386000,
      averageOrder: 623,
    },
    {
      age: "25–34",
      customers: 920,
      orders: 1420,
      revenue: 945000,
      averageOrder: 665,
    },
    {
      age: "35–44",
      customers: 670,
      orders: 1040,
      revenue: 812000,
      averageOrder: 781,
    },
    {
      age: "45–54",
      customers: 290,
      orders: 470,
      revenue: 398000,
      averageOrder: 847,
    },
    {
      age: "55+",
      customers: 110,
      orders: 180,
      revenue: 142000,
      averageOrder: 789,
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      category: "Shirts",
      sold: 128,
      revenue: 319872,
    },
    {
      id: 2,
      name: "Slim Fit Black Shirt",
      category: "Shirts",
      sold: 104,
      revenue: 259896,
    },
    {
      id: 3,
      name: "Oversized T-Shirt",
      category: "T-Shirts",
      sold: 96,
      revenue: 191904,
    },
    {
      id: 4,
      name: "Tailored Blazer",
      category: "Blazers",
      sold: 72,
      revenue: 287928,
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      category: "Pants",
      sold: 65,
      revenue: 162435,
    },
  ];
  const recentSales = [
    {
      id: "#ORD-1048",
      customer: "Arjun Nair",
      product: "Classic White Shirt",
      amount: 2499,
      status: "Completed",
      date: "31 Aug 2026",
    },
    {
      id: "#ORD-1047",
      customer: "Rahul Kumar",
      product: "Tailored Blazer",
      amount: 3999,
      status: "Completed",
      date: "31 Aug 2026",
    },
    {
      id: "#ORD-1046",
      customer: "Vishnu Raj",
      product: "Slim Fit Jeans",
      amount: 2499,
      status: "Processing",
      date: "30 Aug 2026",
    },
    {
      id: "#ORD-1045",
      customer: "Adithya S",
      product: "Oversized T-Shirt",
      amount: 1999,
      status: "Completed",
      date: "30 Aug 2026",
    },
    {
      id: "#ORD-1044",
      customer: "Manu Joseph",
      product: "Leather Jacket",
      amount: 5999,
      status: "Refunded",
      date: "29 Aug 2026",
    },
  ];

  const yearlyData = [
    {
      year: 2022,
      revenue: 1250000,
      profit: 285000,
      loss: 72000,
      orders: 1180,
      customers: 840,
      productsSold: 1640,
    },
    {
      year: 2023,
      revenue: 1680000,
      profit: 410000,
      loss: 85000,
      orders: 1650,
      customers: 1240,
      productsSold: 2310,
    },
    {
      year: 2024,
      revenue: 2150000,
      profit: 570000,
      loss: 92000,
      orders: 2240,
      customers: 1780,
      productsSold: 3180,
    },
    {
      year: 2025,
      revenue: 2380000,
      profit: 640000,
      loss: 108000,
      orders: 2460,
      customers: 2040,
      productsSold: 3520,
    },
    {
      year: 2026,
      revenue: 2745000,
      profit: 780000,
      loss: 95000,
      orders: 2890,
      customers: 2410,
      productsSold: 4210,
    },
  ];

  const columns = [
    { accessorKey: "year", header: "year" },
    { accessorKey: "revenue", header: "revenue" },
    { accessorKey: "profit", header: "profit" },
    { accessorKey: "loss", header: "loss" },
    { accessorKey: "margin", header: "margin" },
    { accessorKey: "orders", header: "orders" },
    { accessorKey: "customers", header: "customers" },
    { accessorKey: "productsSold", header: "products" },
    { accessorKey: "revenueGrowth", header: "Revenue Growth" },
    { accessorKey: "profitGrowth", header: "Profit Growth" },
  ];

  const table = useTable({
    data: yearlyData,
    columns,
    features: tableFeatures(),
  });
  return (
    <div className="min-h-full w-full ">
      <div className="">
        {/* <div className="flex items-end justify-between">
          <div className="flex flex-col gap-7">
            <p className=" uppercase tracking-[0.20em] text-neutral-500 text-xs">
              store / products
            </p>

            <span>
              <h4 className="font-semibold text-3xl  text-white  ">Sales</h4>
              <p className="max-w-2xl   text-neutral-400 leading-8">
                Manage your fashion collection, varients and inventory.
              </p>
            </span>
          </div>

          <button
            className="flex items-center gap-2 h-9 px-2.5 bg-white font-semibold text-sm rounded-lg  transition
                  hover:bg-[#e8e8e8]"
          >
           
          </button>
        </div> */}

        {/* overview of  products */}
        {/* <div className="grid grid-cols-4 gap-3 pt-10">
          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
            <div className="flex justify-between items-center w-full ">
              <div className="flex flex-col gap-1">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                  Total Revenue
                </p>

                <h3 className="text-white text-lg">$367</h3>
                <p className="text-neutral-500 text-xs">
                  Compaired with previous period
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-400/70">
                <MdOutlineArrowOutward /> <p>12.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
            <div className="flex justify-between items-center w-full ">
              <div className="flex flex-col gap-1">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                  Total Profit
                </p>

                <h3 className="text-white text-lg">$2345</h3>
                <p className="text-neutral-500 text-xs">
                  Net profit from sales
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-400/70">
                <MdOutlineArrowOutward /> <p>12.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
            <div className="flex justify-between items-center w-full ">
              <div className="flex flex-col gap-1">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                  Total Orders
                </p>

                <h3 className="text-white text-lg">$8</h3>
                <p className="text-neutral-500 text-xs">
                  successfully placed orders
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-400/70">
                <MdOutlineArrowOutward /> <p>12.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
            <div className="flex justify-between items-center w-full ">
              <div className="flex flex-col gap-1">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                  Average Order Value
                </p>

                <h3 className="text-white text-lg">$14</h3>
                <p className="text-neutral-500 text-xs">
                  Average revenue per order
                </p>
              </div>
              <div className="flex items-center gap-1 text-orange-400/70">
                <FiArrowDownRight size={20} /> <p>12.2%</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="mt-5">
          <div className="px-6 py-4">
            <div>
              <div className="bg-[#101318] border border-[#242932] rounded-2xl  p-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                      executive overview
                    </p>

                    <h3 className="text-white text-lg">
                      Complete Business Analysis
                    </h3>
                    <p className="text-neutral-500 text-xs">
                      Full business overview from launch to today
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div>
                      <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                        Business Since
                      </p>

                      <h3 className="text-white text-lg text-right">2002</h3>
                    </div>

                    <div className="w-[1px] h-10 bg-white/20 text-white/70" />
                    <div>
                      <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                        current year
                      </p>

                      <h3 className="text-white text-lg text-right">2026</h3>
                    </div>
                  </div>
                </div>
                <div className="pt-10 ">
                  <div className="grid grid-cols-4 gap-3 ">
                    <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            lifetime Revenue
                          </p>

                          <h3 className="text-white text-lg">$367</h3>
                          <p className="text-neutral-500 text-xs">
                            since launch
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400/70">
                          <MdOutlineArrowOutward /> <p>12.2%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            lifetime Profit
                          </p>

                          <h3 className="text-white text-lg">$2345</h3>
                          <p className="text-neutral-500 text-xs">Net profit</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400/70">
                          <MdOutlineArrowOutward /> <p>12.2%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            lifetime loss
                          </p>

                          <h3 className="text-white text-lg">$8</h3>
                          <p className="text-neutral-500 text-xs">
                            recorded loss
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400/70">
                          <MdOutlineArrowOutward /> <p>12.2%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            total orders
                          </p>

                          <h3 className="text-white text-lg">$14</h3>
                          <p className="text-neutral-500 text-xs">
                            completed orders
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-orange-400/70">
                          <FiArrowDownRight size={20} /> <p>12.2%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-1 mt-2">
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            profit margin
                          </p>

                          <h3 className="text-white text-lg">26%</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            loss ratio
                          </p>

                          <h3 className="text-white text-lg">4%</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            Average Order
                          </p>

                          <h3 className="text-white text-lg">$231</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            customers
                          </p>

                          <h3 className="text-white text-lg">$22</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            products sold
                          </p>

                          <h3 className="text-white text-lg">1,554</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#101318] h-[90px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
                      <div className="flex justify-between items-center w-full ">
                        <div className="flex flex-col gap-1">
                          <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                            best profit year
                          </p>

                          <h3 className="text-white text-lg">$14</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#101318] border border-[#242932] rounded-2xl  p-4 mt-4">
                <AnalyticsCompleteChart />
              </div>

              <div className="bg-[#101318] border border-[#242932] rounded-2xl  p-4 mt-4">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                    historical comparison
                  </p>

                  <h3 className="text-white text-lg">
                    Business Performance Comparison
                  </h3>
                  <p className="text-neutral-500 text-xs">
                    Complete comparison of business growth from launch to today
                  </p>
                </div>
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="border-b border-[#242932]"
                      >
                        {headerGroup.headers.map((heading) => (
                          <th
                            key={heading.id}
                            className="px-4 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                          >
                            {heading.column.columnDef.header}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[#242932] hover:bg-white/[0.025] transition-colors"
                      >
                        {row.getAllCells().map((cell) => {
                          const value = cell.getValue();

                          const profitValues = yearlyData.map(
                            (item) => item.profit,
                          );
                          const highestProfit = Math.max(...profitValues);
                          const lowestProfit = Math.min(...profitValues);
                          const profitRange = highestProfit - lowestProfit;

                          const profitPercentage =
                            profitRange > 0
                              ? ((value - lowestProfit) / profitRange) * 100
                              : 100;

                          return (
                            <td
                              key={cell.id}
                              className="px-4 py-4 text-sm whitespace-nowrap"
                            >
                              {cell.column.id === "year" && (
                                <span className="text-white font-semibold">
                                  {value}
                                </span>
                              )}

                              {cell.column.id === "revenue" && (
                                <span className="text-white font-medium">
                                  ₹{Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "profit" && (
                                <span
                                  className={
                                    profitPercentage >= 70
                                      ? "text-green-400 font-semibold"
                                      : profitPercentage >= 35
                                        ? "text-orange-400 font-semibold"
                                        : "text-red-400 font-semibold"
                                  }
                                >
                                  ₹{Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "loss" && (
                                <span className="text-red-400 font-semibold">
                                  ₹{Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "margin" && (
                                <span
                                  className={
                                    Number(value) >= 25
                                      ? "text-green-400 font-medium"
                                      : Number(value) >= 15
                                        ? "text-orange-400 font-medium"
                                        : "text-red-400 font-medium"
                                  }
                                >
                                  {value}%
                                </span>
                              )}

                              {cell.column.id === "orders" && (
                                <span className="text-neutral-300">
                                  {Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "customers" && (
                                <span className="text-neutral-300">
                                  {Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "productsSold" && (
                                <span className="text-neutral-300">
                                  {Number(value).toLocaleString("en-IN")}
                                </span>
                              )}

                              {cell.column.id === "revenueGrowth" && (
                                <span
                                  className={
                                    Number(value) > 0
                                      ? "text-green-400 font-medium"
                                      : Number(value) < 0
                                        ? "text-red-400 font-medium"
                                        : "text-neutral-500"
                                  }
                                >
                                  {Number(value) > 0 ? "+" : ""}
                                  {value}%
                                </span>
                              )}

                              {cell.column.id === "profitGrowth" && (
                                <span
                                  className={
                                    Number(value) > 0
                                      ? "text-green-400 font-medium"
                                      : Number(value) < 0
                                        ? "text-red-400 font-medium"
                                        : "text-neutral-500"
                                  }
                                >
                                  {Number(value) > 0 ? "+" : ""}
                                  {value}%
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                  <div className="border border-[#242932] rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                      Revenue Growth
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <MdOutlineArrowOutward className="text-green-400/80" />
                      <span className="text-white font-semibold">22%</span>
                      <span className="text-neutral-500 text-xs">
                        since 666
                      </span>
                    </div>
                  </div>

                  <div className="border border-[#242932] rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                      Profit Growth
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <MdOutlineArrowOutward className="text-green-400/80" />
                      <span className="text-white font-semibold">45%</span>
                      <span className="text-neutral-500 text-xs">
                        since 2001
                      </span>
                    </div>
                  </div>

                  <div className="border border-[#242932] rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                      Best Performing Year
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-white font-semibold">45678</span>
                      <span className="text-neutral-500 text-xs">
                        2552 profit
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* profit strategy */}
              <div className=" mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* most sold products */}
                  <div className="bg-[#101318] border border-[#242932] rounded-2xl  ">
                    <div className="flex justify-between items-end p-4">
                      <div className="flex flex-col gap-1">
                        <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                          product intelligence
                        </p>

                        <h3 className="text-white text-lg">
                          most sold products
                        </h3>
                        <p className="text-neutral-500 text-xs">
                          product generating the highest sales volume
                        </p>
                      </div>

                      <div>
                        <BsBoxSeam size={16} className="text-white" />
                      </div>
                    </div>

                    <hr className="w-full text-[#242932]" />

                    <div className="p-4 space-y-1">
                      {products.slice(0, 5).map((productData) => {
                        const maxSold = Math.max(
                          ...products.map((product) => product.sold),
                        );

                        const percentage = (productData.sold / maxSold) * 100;

                        return (
                          <div key={productData.id} className="py-2">
                            <div className="flex justify-between items-end">
                              <div className="flex gap-2 items-center">
                                <div className="h-8 w-8 bg-gray-700/70 rounded-md flex justify-center items-center text-xs text-white font-medium">
                                  {productData.id}
                                </div>

                                <div>
                                  <h4 className="text-sm text-white font-medium">
                                    {productData.name}
                                  </h4>

                                  <p className="text-xs text-neutral-500">
                                    {productData.category}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm text-white font-medium">
                                  {productData.sold}
                                </h4>
                              </div>
                            </div>

                            <div className="w-full h-[3px] bg-white/5 rounded-full mt-3 overflow-hidden">
                              <div
                                className="bg-white h-[3px] rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* age overview */}
                  <div className="bg-[#101318] border border-[#242932] rounded-2xl  ">
                    <div className="flex justify-between items-end p-4">
                      <div className="flex flex-col gap-1">
                        <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                          product intelligence
                        </p>

                        <h3 className="text-white text-lg">
                          most sold products
                        </h3>
                        <p className="text-neutral-500 text-xs">
                          product generating the highest sales volume
                        </p>
                      </div>

                      <div>
                        <BsBoxSeam size={16} className="text-white" />
                      </div>
                    </div>

                    <hr className="w-full text-[#242932]" />

                    <div className="p-4 space-y-1">
                      {products.slice(0, 5).map((productData) => {
                        const maxSold = Math.max(
                          ...products.map((product) => product.sold),
                        );

                        const percentage = (productData.sold / maxSold) * 100;

                        return (
                          <div key={productData.id} className="py-2">
                            <div className="flex justify-between items-end">
                              <div className="flex gap-2 items-center">
                                <div className="h-8 w-8 bg-gray-700/70 rounded-md flex justify-center items-center text-xs text-white font-medium">
                                  {productData.id}
                                </div>

                                <div>
                                  <h4 className="text-sm text-white font-medium">
                                    {productData.name}
                                  </h4>

                                  <p className="text-xs text-neutral-500">
                                    {productData.category}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm text-white font-medium">
                                  {productData.sold}
                                </h4>
                              </div>
                            </div>

                            <div className="w-full h-[3px] bg-white/5 rounded-full mt-3 overflow-hidden">
                              <div
                                className="bg-white h-[3px] rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreSales;
