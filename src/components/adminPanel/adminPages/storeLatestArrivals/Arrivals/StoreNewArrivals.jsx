import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { FiSearch, FiFilter } from "react-icons/fi";
import NewArrivalsList from "../ArrivalsLIst/NewArrivalsList";
import NewArrivalsGrid from "../ArrivalsGrid/NewArrivalsGrid";
const StoreNewArrivals = () => {
  
  const [newArrivalsNavi, setNewArrivalsNavi] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="py-7 px-7">
        <div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-7">
              <p className=" uppercase tracking-[0.20em] text-neutral-500 text-xs">
                store / products
              </p>

              <span>
                <h4 className="font-semibold text-3xl  text-white  ">
                  Products
                </h4>
                <p className="max-w-2xl   text-neutral-400 leading-8">
                  Manage your fashion collection, varients and inventory.
                </p>
              </span>
            </div>

            <button
              className="flex items-center gap-2 h-9 px-2.5 bg-white font-semibold text-sm rounded-lg  transition
                  hover:bg-[#e8e8e8]"
            >
              <IoAdd className="text-black" size={20} /> <p>Add New Arrivals</p>
            </button>
          </div>

          {/* overview of  products */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-white">
            <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
              <p className="text-sm text-gray-500">Total New Arrivals</p>
              <h2 className="mt-2 text-2xl font-semibold">24</h2>
            </div>

            <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
              <p className="text-sm text-gray-500">Active</p>
              <h2 className="mt-2 text-2xl font-semibold">18</h2>
            </div>

            <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
              <p className="text-sm text-gray-500">Scheduled</p>
              <h2 className="mt-2 text-2xl font-semibold">4</h2>
            </div>

            <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
              <p className="text-sm text-gray-500">Expired</p>
              <h2 className="mt-2 text-2xl font-semibold">2</h2>
            </div>
          </div>
          <div className="py-7 ">
            <div className="flex justify-between">
              <div
                className="   hidden
                          md:flex
                          items-center
                          gap-3
                          bg-[#151719]
                          border
                          border-[#242932]
                          px-4
                          h-10
                          w-[220px]
                          lg:w-96
                          rounded-lg"
              >
                <FiSearch size={20} className="text-[#666D78]" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  className="
                            bg-transparent
                            outline-none
                            w-full
                            text-xs
                            text-white
                            placeholder:text-[#505762] "
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-10 items-center gap-2 rounded-lg border border-[#292d33] bg-[#151719] px-4 text-sm text-gray-300 transition hover:bg-[#1b1e21]">
                  <FiFilter size={16} />
                  Filter
                </button>
                <div className="border border-[#292d33] bg-[#151719] text-gray-300 transition hover:bg-[#1b1e21] rounded-lg h-10 py-0.5 px-2 flex justify-center items-center ">
                  <div className="flex justify-evenly items-center gap-2 ">
                    <button
                      className={` h-6 w-6 flex justify-center items-center rounded-md transition-all duration-500`}
                   onClick={()=>setNewArrivalsNavi(true)}
                   >
                      <CiGrid41 />
                    </button>
                    <button
                      className={` h-6 w-6 flex justify-center items-center rounded-md transition-all duration-500`}
                     onClick={()=>setNewArrivalsNavi(false)}
                    >
                      <CiCircleList />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-7">
            {!newArrivalsNavi ? <NewArrivalsList /> : <NewArrivalsGrid />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreNewArrivals;
