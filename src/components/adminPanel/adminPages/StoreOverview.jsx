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
import {FiTag,} from "react-icons/fi";


const StoreOverview = () => {
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
            <button className="uppercase flex items-center gap-2 w-32 h-8 rounded-md bg-blue-500 justify-center   text-xs text-white">
              <IoAdd size={20} className="text-white" /> add product
            </button>
          </div>
        </div>

        <div className="py-10">
          <div className="grid grid-cols-4 text-white h-36 gap-5">
            <div className="bg-linear-to-tl from-blue-900/50 to-blue-950/35 flex flex-col justify-center rounded-lg border border-blue-950 px-5">
              <div className="flex justify-between items-start">
                <span className="">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-xs">
                    total revenue
                  </p>
                  <h4 className="font-semibold text-2xl  text-white mt-2">
                    $4,82,500
                  </h4>
                </span>
                <span className="h-8 w-8 rounded-lg border border-gray-600 bg-blue-900/85 flex justify-center items-center ">
                  <FiDollarSign className="text-white" size={15} />
                </span>
              </div>
              <div className="flex items-center  gap-2 mt-3">
                <span className="flex items-center gap-1 text-green-400">
                  <FiArrowUpRight size={15} />
                  <span className="flex items-center text-xs">
                    <IoAdd size={12} />
                    15.4%
                  </span>
                </span>
                <p className="text-gray-400 text-xs">this month</p>
              </div>
            </div>

            <div className="bg-linear-to-tl from-blue-900/50 to-blue-950/35 flex flex-col justify-center rounded-lg border border-blue-950 px-5">
              <div className="flex justify-between items-start">
                <span className="">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-xs">
                    total orders
                  </p>
                  <h4 className="font-semibold text-2xl  text-white mt-2">
                    $4,82,500
                  </h4>
                </span>
                <span className="h-8 w-8 rounded-lg border border-gray-600 bg-blue-900/85 flex justify-center items-center ">
                  <SiHackthebox className="text-white" size={15} />
                </span>
              </div>
              <div className="flex items-center  gap-2 mt-3">
                <span className="flex items-center gap-1 text-green-400">
                  <FiArrowUpRight size={15} />
                  <span className="flex items-center text-xs">
                    <IoAdd size={12} />
                    15.4%
                  </span>
                </span>
                <p className="text-gray-400 text-xs">this month</p>
              </div>
            </div>

            <div className="bg-linear-to-tl from-blue-900/50 to-blue-950/35 flex flex-col justify-center rounded-lg border border-blue-950 px-5">
              <div className="flex justify-between items-start">
                <span className="">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-xs">
                    products
                  </p>
                  <h4 className="font-semibold text-2xl  text-white mt-2">
                    $4,82,500
                  </h4>
                </span>
                <span className="h-8 w-8 rounded-lg border border-gray-600 bg-blue-900/85 flex justify-center items-center ">
                  <LuShoppingBag className="text-white" size={15} />
                </span>
              </div>
              <div className="flex items-center  gap-2 mt-3">
                <span className="flex items-center gap-1 text-green-400">
                  <FiArrowUpRight size={15} />
                  <span className="flex items-center text-xs">
                    <IoAdd size={12} />
                    15.4%
                  </span>
                </span>
                <p className="text-gray-400 text-xs">this month</p>
              </div>
            </div>

            <div className="bg-linear-to-tl from-blue-900/50 to-blue-950/35 flex flex-col justify-center rounded-lg border border-blue-950 px-5">
              <div className="flex justify-between items-start">
                <span className="">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-xs">
                    customers
                  </p>
                  <h4 className="font-semibold text-2xl  text-white mt-2">
                    $4,82,500
                  </h4>
                </span>
                <span className="h-8 w-8 rounded-lg border border-gray-600 bg-blue-900/85 flex justify-center items-center ">
                  <RxPeople className="text-white" size={15} />
                </span>
              </div>
              <div className="flex items-center  gap-2 mt-3">
                <span className="flex items-center gap-1 text-green-400">
                  <FiArrowUpRight size={15} />
                  <span className="flex items-center text-xs">
                    <IoAdd size={12} />
                    15.4%
                  </span>
                </span>
                <p className="text-gray-400 text-xs">this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-4">
            <AnalyticsChart />
          </div>

          <div className="col-span-2">
            <div className="w-full  bg-[#101318] border border-[#242932] rounded-2xl overflow-hidden  px-7 py-7">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-xs ">
                    orders
                  </p>
                  <span>
                    <h3 className="text-white text-2xl">328</h3>
                    <p className="text-neutral-500 text-xs">Active Orders</p>
                  </span>
                </div>
                <span className="h-8 w-8 rounded-lg border-none bg-cyan-600/50 flex justify-center items-center ">
                  <SiHackthebox className="text-cyan-300" size={15} />
                </span>
              </div>

              <div className="mt-10 space-y-6">
                {/* Pending */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-400">Pending</p>
                    <h3 className="text-sm text-white">24</h3>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#252525] overflow-hidden">
                    <div
                      className="h-full bg-orange-600 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>

                {/* Processing */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-400">Processing</p>
                    <h3 className="text-sm text-white">24</h3>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#252525] overflow-hidden">
                    <div
                      className="h-full bg-violet-400 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>

                {/* Shipped */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-400">Shipped</p>
                    <h3 className="text-sm text-white">24</h3>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#252525] overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>

                {/* Delivered */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-400">Delivered</p>
                    <h3 className="text-sm text-white">24</h3>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#252525] overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
                </div>

                {/* Cancelled */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-400">Cancelled</p>
                    <h3 className="text-sm text-white">24</h3>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#252525] overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </div>
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

        <div className="mt-10">
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
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;
