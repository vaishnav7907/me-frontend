import React from "react";
import { IoAdd } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
// import { FiArrowDownRight } from "react-icons/fi";
// import { FiArrowDownLeft } from "react-icons/fi";
import { SiHackthebox } from "react-icons/si";
import { LuShoppingBag } from "react-icons/lu";
import { RxPeople } from "react-icons/rx";
import AnalyticsChart from "./charts/AnalyticsChart";
import { BiError } from "react-icons/bi";
import { LuClock4 } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";
import { FaEye } from "react-icons/fa";
// import { FiMinus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { FiTag } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const StoreOverview = () => {
  const [monthProfitLoss, setMonthProfitLoss] = useState(null);

  const monthProfitOrLoss = async () => {
    try {
      const adminToken = localStorage.getItem("token");
      const monthProfitOrLossApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/previousMonthAnalysis`,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );
      console.log("month profit or losss", monthProfitOrLossApi.data);

      setMonthProfitLoss(monthProfitOrLossApi.data);
    } catch (error) {
      console.log("Error in previous month analysis:", error);
    }
  };

  // useEffect(() => {
  //   monthProfitOrLoss();
  // }, []);

  const [allOrders, setAllOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      const getAllOrdersFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getAdminOrder`,
      );

      setAllOrders(getAllOrdersFn.data.orders);
      console.log("all orders", getAllOrdersFn.data.orders);
    } catch (error) {
      console.log("error in get all orders", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    monthProfitOrLoss();
    getAllOrders();
  }, []);

  const orderStatuses = [
    { name: "Pending", color: "text-amber-300", barColor: "bg-amber-400" },
    { name: "Confirmed", color: "text-green-400", barColor: "bg-green-400" },
    { name: "Processing", color: "text-orange-400", barColor: "bg-orange-400" },
    { name: "Shipped", color: "text-blue-400", barColor: "bg-blue-400" },
    {
      name: "Out for Delivery",
      color: "text-purple-400",
      barColor: "bg-purple-400",
    },
    {
      name: "Delivered",
      color: "text-emerald-400",
      barColor: "bg-emerald-400",
    },
    { name: "Cancelled", color: "text-red-400", barColor: "bg-red-400" },
  ];

  const activeOrders = allOrders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.orderStatus),
  ).length;

  return (
    <div className="min-h-screen px-6 py-6 ">
      <div>
        <div className="flex flex-col gap-2">
          <p className="uppercase tracking-[0.20em] text-neutral-500 text-xs">
            store overview
          </p>

          <div className="flex justify-between items-end">
            <span>
              <h2 className=" font-semibold text-3xl  text-white  ">
                Good morning, Admin.
              </h2>
              <p className="max-w-2xl   text-neutral-400 leading-8">
                Here's what's happening with your ME store today
              </p>
            </span>
            {/* <button className="uppercase flex items-center gap-2 w-32 h-8 rounded-md bg-blue-500 justify-center   text-xs text-white">
              <IoAdd size={20} className="text-white" /> add product
            </button> */}
          </div>
        </div>

        <div className="py-8">
          <div className="grid grid-cols-4 gap-5">
            <div className="group rounded-xl border border-[#252a31] bg-[#111419] px-5 py-5 transition-all duration-300 hover:border-[#343b45] hover:bg-[#14181e]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Previous Month Revenue
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    ₹
                    {(
                      monthProfitLoss?.previousMonth?.revenue ?? 0
                    ).toLocaleString("en-IN")}
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#29303a] bg-[#191e25]">
                  <FiDollarSign size={16} className="text-neutral-300" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] text-neutral-500">
                  {monthProfitLoss?.previousMonth?.month ?? "Loading..."}
                </span>
              </div>
            </div>

            <div className="group rounded-xl border border-[#252a31] bg-[#111419] px-5 py-5 transition-all duration-300 hover:border-[#343b45] hover:bg-[#14181e]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Previous Month Profit
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold tracking-tight text-green-400">
                    ₹
                    {(
                      monthProfitLoss?.previousMonth?.profit ?? 0
                    ).toLocaleString("en-IN")}
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#29303a] bg-[#191e25]">
                  <FiArrowUpRight size={16} className="text-green-400" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] text-neutral-500">
                  Revenue minus product cost
                </span>
              </div>
            </div>

            <div className="group rounded-xl border border-[#252a31] bg-[#111419] px-5 py-5 transition-all duration-300 hover:border-[#343b45] hover:bg-[#14181e]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Previous Month Loss
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold tracking-tight text-red-400">
                    ₹
                    {(monthProfitLoss?.previousMonth?.loss ?? 0).toLocaleString(
                      "en-IN",
                    )}
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#29303a] bg-[#191e25]">
                  <BiError size={17} className="text-red-400" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] text-neutral-500">
                  {monthProfitLoss?.previousMonth?.totalOrders ?? 0} delivered
                  orders
                </span>
              </div>
            </div>

            <div className="group rounded-xl border border-[#252a31] bg-[#111419] px-5 py-5 transition-all duration-300 hover:border-[#343b45] hover:bg-[#14181e]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Total Orders
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {monthProfitLoss?.previousMonth?.totalOrders ?? 0}
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#29303a] bg-[#191e25]">
                  <SiHackthebox size={16} className="text-neutral-300" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] text-neutral-500">
                  Delivered orders last month
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-4">
            <AnalyticsChart />
          </div>

          <div className="col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-[#252c38] bg-gradient-to-br from-[#131923] via-[#10141b] to-[#0d1117] p-6 shadow-xl shadow-black/20 sm:p-7">
              <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cyan-500/[0.06] blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.08]">
                    <SiHackthebox className="text-cyan-300" size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                      Orders
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      Order status overview
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1 text-[10px] font-medium tracking-wider text-cyan-300">
                  LIVE OVERVIEW
                </span>
              </div>

              <div className="relative mt-7 rounded-xl border border-cyan-400/15 bg-gradient-to-r from-cyan-400/[0.08] to-transparent p-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.13em] text-neutral-400">
                      Active Orders
                    </p>

                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                      {activeOrders.toLocaleString("en-IN")}
                    </h2>

                    <p className="mt-2 text-xs text-neutral-500">
                      Orders currently in progress
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                    <SiHackthebox className="text-cyan-300" size={22} />
                  </div>
                </div>
              </div>

              <div className="mb-5 mt-8 flex items-center justify-between">
                <h4 className="text-sm font-medium text-neutral-200">
                  Status Breakdown
                </h4>

                <span className="text-xs text-neutral-500">
                  {allOrders.length.toLocaleString("en-IN")} total orders
                </span>
              </div>

              <div className="space-y-5">
                {orderStatuses.map((status) => {
                  const count = allOrders.filter(
                    (order) => order.orderStatus === status.name,
                  ).length;

                  const percentage =
                    allOrders.length > 0 ? (count / allOrders.length) * 100 : 0;

                  return (
                    <div key={status.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          {/* <span
                            className={`h-2 w-2 shrink-0 rounded-full ${status.dotColor}`}
                          /> */}

                          <span className={`truncate text-sm ${status.color}`}>
                            {status.name}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-sm font-medium tabular-nums text-neutral-200">
                            {count}
                          </span>

                          <span className="min-w-[42px] text-right text-xs tabular-nums text-neutral-500">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                      </div>

                      <div className="h-1 overflow-hidden rounded-full bg-[#252b35]">
                        <div
                          className={`h-full rounded-full transition-[width] duration-500 ease-out ${status.barColor}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-[#252b35] pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Completed orders</span>

                  <span className="font-medium text-emerald-400">
                    {allOrders
                      .filter((order) => order.orderStatus === "Delivered")
                      .length.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ///////////////// */}
        <div className="grid grid-cols-3 gap-3 mt-7 ">
          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center px-5">
            <span className="h-10 w-10 rounded-lg border-none bg-orange-400/20 flex justify-center items-center ">
              <BiError className="text-orange-500" size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                low stock
              </p>

              <h3 className="text-white text-lg">32</h3>
              <p className="text-neutral-500 text-xs">
                Products need restocking
              </p>
            </div>
          </div>

          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center px-5">
            <span className="h-10 w-10 rounded-lg border-none bg-blue-400/20 flex justify-center items-center ">
              <LuClock4 className="text-cyan-500" size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                pending orders
              </p>

              <h3 className="text-white text-lg">32</h3>
              <p className="text-neutral-500 text-xs">
                Orders waiting for processing
              </p>
            </div>
          </div>

          <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center px-5">
            <span className="h-10 w-10 rounded-lg border-none bg-green-400/20 flex justify-center items-center ">
              <SiTicktick className="text-green-500" size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                new arrivals
              </p>

              <h3 className="text-white text-lg">32</h3>
              <p className="text-neutral-500 text-xs">Added this month</p>
            </div>
          </div>
        </div>

        <div className="bg-[#101318]  w-full border border-[#242932] rounded-2xl mt-7">
          <div>
            <div className=" px-5 py-6  flex justify-between items-end">
              <div className="flex flex-col gap-1 ">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] font-medium ">
                  store activity
                </p>

                <h3 className="text-white text-2xl">Recent Orders</h3>
              </div>
              <div className="uppercase text-blue-400/70 text-xs tracking-wide">
                view all
              </div>
            </div>

            <hr className="bg-[#242932] w-full h-0.5" />
            <div className="px-5 py-6 flex flex-col justify-center gap-4">
              <div className="flex justify-between text-white font-semibold bg-gray-900 px-2 rounded-md py-1">
                <h4>Order</h4>
                <h4>Customer</h4>
                <h4>Product</h4>
                <h4>Amount</h4>
                <h4>Status</h4>
                <h4>Action</h4>
              </div>
              <div className="text-white flex justify-between">
                <h4>#ME1024</h4>
                <p>Arun Kumar</p>
                <p>Premiun T-Shirt</p>
                <p>$30</p>
                <button className="  px-2 bg-green-800/55 rounded-2xl border border-green-600 text-green-600 text-center">
                  Delivered
                </button>
                <span className="flex gap-2">
                  <button className="py-1 w-7 bg-gray-700/35 flex justify-center items-center rounded-md text-gray-400">
                    <FaEye />
                  </button>
                  <button className="py-1 w-7 bg-gray-700/35 flex justify-center items-center rounded-md text-gray-400">
                    <BsThreeDots />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* /////////////////// */}
        <div className="grid grid-cols-2   gap-3  mt-7">
          <div className=" bg-[#101318] border border-[#242932] rounded-2xl">
            <div className="px-5 py-6 flex justify-between w-full">
              <div>
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] font-medium ">
                  inventory
                </p>

                <h3 className="text-white text-2xl">Low Stock Products</h3>
              </div>

              <button className=" text-gray-400">
                <BsThreeDots />
              </button>
            </div>
            <hr className="w-full bg-[#242932]" />

            <div className="flex justify-between items-center px-5 py-6">
              <div className="flex items-center gap-2">
                <span className="h-10 w-10 rounded-lg border border-orange-400/20 text-orange-500 bg-orange-400/15 flex justify-center items-center">
                  <LuShoppingBag size={20} />
                </span>
                <div>
                  <h4 className="text-white font-semibold">Premium Shirts</h4>
                  <p className="text-neutral-500 text-xs ">Shirts</p>
                </div>
              </div>

              <span className="text-orange-500 flex flex-col justify-center items-center">
                <p>2</p>
                <p className="uppercase text-neutral-500 text-[10px]">Left</p>
              </span>
            </div>
          </div>

          <div className=" bg-[#101318] border border-[#242932] rounded-2xl">
            <div className="px-5 py-6 flex justify-between w-full">
              <div>
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] font-medium ">
                  collection
                </p>

                <h3 className="text-white text-2xl">Latest New Arrivals</h3>
              </div>

              <button className=" text-gray-400">
                <BsThreeDots />
              </button>
            </div>
            <hr className="w-full bg-[#242932]" />

            <div className="flex justify-between items-center px-5 py-6">
              <div className="flex items-center gap-2">
                <span className="h-10 w-10 rounded-lg border border-blue-400/20 text-cyan-500 bg-blue-400/15 flex justify-center items-center">
                  <SiHackthebox size={20} />
                </span>
                <div>
                  <h4 className="text-white font-semibold">Premium Shirts</h4>
                  <p className="text-neutral-500 text-xs ">Shirts</p>
                </div>
              </div>

              <span className="text-white ">
                <p>$30</p>
              </span>
            </div>
          </div>
        </div>

        {/*  */}

        {/* <div className="mt-10">
          <div>
            <div>
              <p className="uppercase tracking-[0.20em] text-neutral-500 text-[10px] font-medium ">
                shortcuts
              </p>

              <h3 className="text-white text-2xl font-semibold">
                Quick Actions
              </h3>
            </div>
          </div>

          <div className="py-5 grid grid-cols-4 gap-3">
            <div className="bg-[#101318] h-20 border border-[#242932] rounded-xl flex gap-3 items-center px-5">
              <span className="h-10 w-10 rounded-lg border border-violet-600/30 bg-violet-600/15 flex justify-center items-center ">
                <IoAdd className="text-white" size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-sm font-semibold">Add Product</h3>
                <p className="text-neutral-500 text-[12px]">
                  Manage Store
                </p>
              </div>
            </div>

            <div className="bg-[#101318] h-20 border border-[#242932] rounded-xl flex gap-3 items-center px-5">
              <span className="h-10 w-10 rounded-lg border border-blue-400/20 text-cyan-500 bg-blue-400/15 flex justify-center items-center">
                  <SiHackthebox size={20} />
                </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-sm font-semibold">Add New Arrivals</h3>
                <p className="text-neutral-500 text-[12px]">
                  Manage Store
                </p>
              </div>
            </div>

            <div className="bg-[#101318] h-20 border border-[#242932] rounded-xl flex gap-3 items-center px-5">
              <span className="h-10 w-10 rounded-lg border border-green-600/20 bg-green-600/15 flex justify-center items-center ">
                <FiTag className="text-green-600" size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-sm font-semibold">Add Brand</h3>
                <p className="text-neutral-500 text-[12px]">
                  Manage Store
                </p>
              </div>
            </div>

            <div className="bg-[#101318] h-20 border border-[#242932] rounded-xl flex gap-3 items-center px-5">
              <span className="h-10 w-10 rounded-lg border border-orange-400/30 bg-orange-400/20 flex justify-center items-center ">
                <FiDollarSign className="text-orange-400" size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-sm font-semibold">Create Sale</h3>
                <p className="text-neutral-500 text-[12px]">
                  Manage Store
                </p>
              </div>
            </div>

            
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StoreOverview;
