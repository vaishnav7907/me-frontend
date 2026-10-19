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
import { UseMe } from "../../context/Meprovider";

const StoreOverview = () => {
  const { allproducts, setAllProducts } = UseMe();
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

  const getAllProducts = async () => {
    try {
      const getProductsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getProducts`,
      );

      setAllProducts(getProductsApi.data.products || []);

      console.log("get all products", getProductsApi.data.products);

      console.log(
        "IMAGE:",
        getProductsApi.data.products?.[0]?.variants?.[0]?.images?.[0]?.url,
      );

      console.log("BRAND:", getProductsApi.data.products?.[0]?.brand);
    } catch (error) {
      console.log("error in get products", error);
      console.log("Server response:", error.response?.data);
    }
  };

  useEffect(() => {
    monthProfitOrLoss();
    getAllOrders();
    getAllProducts();
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

  const lowProducts = allproducts.filter((product) =>
    product.variants.some((variant) =>
      variant.sizes?.some((size) => size.stock > 0 && size.stock <= 10),
    ),
  );

  console.log("lowstock products", lowProducts);

  const pendingOrders = allproducts.filter(
    (order) => order.orderStatus === "Pending",
  ).length;

  const latestArrivalsProducts = allproducts.filter((product) => {
    const createdDate = new Date(product.createdAt);
    const today = new Date();

    return (
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  }).length;

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

          <div className="grid grid-cols-3 gap-3 mt-7 ">
            <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center px-5">
              <span className="h-10 w-10 rounded-lg border-none bg-orange-400/20 flex justify-center items-center ">
                <BiError className="text-orange-500" size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                  low stock
                </p>

                <h3 className="text-white text-lg">{lowProducts.length}</h3>
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

                <h3 className="text-white text-lg">{pendingOrders}</h3>
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

                <h3 className="text-white text-lg">{latestArrivalsProducts}</h3>
                <p className="text-neutral-500 text-xs">Added this month</p>
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

        {/* /////////////////// */}

        <div className="grid grid-cols-1 gap-3 mt-7">
          <div className="bg-[#101318] border border-[#242932] rounded-2xl">
            <div className="px-5 py-6 flex justify-between items-center">
              <div>
                <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] font-medium">
                  Inventory
                </p>

                <h3 className="text-white text-2xl">Low Stock Products</h3>
              </div>

              <span className="text-orange-400 text-sm">
                {lowProducts.length} products
              </span>
            </div>

            <hr className="border-[#242932]" />

            <div className="divide-y divide-[#242932]/70">
              {lowProducts.length > 0 ? (
                lowProducts.map((lowstockproduct) => (
                  <div
                    key={lowstockproduct._id}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-all duration-200 hover:bg-white/[0.025]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-400/15 bg-orange-400/[0.08] text-orange-400 transition-colors duration-200 group-hover:border-orange-400/30 group-hover:bg-orange-400/[0.14]">
                        <LuShoppingBag size={19} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold text-gray-100 transition-colors group-hover:text-white">
                          {lowstockproduct.name}
                        </h4>

                        <p className="mt-1 text-xs text-neutral-500">
                          {lowstockproduct.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="text-sm font-semibold tracking-tight text-gray-100">
                        ₹{lowstockproduct.price}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-400/15 bg-orange-400/[0.08] px-2 py-1 text-[10px] font-medium text-orange-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        {lowstockproduct.stock} left
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-400">
                    <icon name="check-circle" size={22} />
                  </div>

                  <p className="text-sm font-medium text-gray-200">
                    Inventory looks good
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    No low-stock products need attention.
                  </p>
                </div>
              )}
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
