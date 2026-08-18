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


        <div className="grid grid-cols-6">
          <div className="col-span-4">
            <AnalyticsChart />  
          </div>

          <div className="col-span-2">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;
