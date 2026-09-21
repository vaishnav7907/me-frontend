import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiSearch, FiFilter } from "react-icons/fi";
import NewArrivalsList from "../ArrivalsLIst/NewArrivalsList";
import NewArrivalsGrid from "../ArrivalsGrid/NewArrivalsGrid";
import CreateLatestOverDisplay from "../createLatestOverDisplay/CreateLatestOverDisplay";
import axios from "axios";
const StoreNewArrivals = () => {
  const [newArrivalsNavi, setNewArrivalsNavi] = useState(false);
  const [categoryy, setCategoryy] = useState("All");

  const [createLatestArrivalsModal, setCreateLatestArrivalsModal] =
    useState(false);

  const [getLatestArrivals, setGetLatestArrivals] = useState([]);

  const getAllLatestArrivals = async () => {
    try {
      const getlatestArrivalsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/latestArrivals`,
      );

      setGetLatestArrivals(getlatestArrivalsApi.data.latestArrivalsData);

      console.log(
        "get Latest Arrivals",
        getlatestArrivalsApi.data.latestArrivalsData,
      );
    } catch (error) {
      console.log("error in get latest Arrivals", error);
    }
  };

  useEffect(() => {
    getAllLatestArrivals();
  }, []);
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
              onClick={() => setCreateLatestArrivalsModal(true)}
            >
              <IoAdd className="text-black" size={20} />{" "}
              <p>Add Latest Arrivals</p>
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
                <div>
                  <select
                    value={categoryy}
                    onChange={(e) => setCategoryy(e.target.value)}
                    className="h-10 rounded-lg border border-[#292d33] bg-[#151719] px-4 text-sm text-gray-300 outline-none"
                  >
                    <option value="">All</option>
                    <option value="Shirts">Shirts</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Innerwear">Innerwear</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>
                <div className="border border-[#292d33] bg-[#151719] text-gray-300 transition hover:bg-[#1b1e21] rounded-lg h-10 py-0.5 px-2 flex justify-center items-center ">
                  <div className="flex justify-evenly items-center gap-2 ">
                    <button
                      className={` h-6 w-6 flex justify-center items-center rounded-md transition-all duration-500`}
                      onClick={() => setNewArrivalsNavi(true)}
                    >
                      <CiGrid41 />
                    </button>
                    <button
                      className={` h-6 w-6 flex justify-center items-center rounded-md transition-all duration-500`}
                      onClick={() => setNewArrivalsNavi(false)}
                    >
                      <CiCircleList />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-7 flex gap-3 flex-wrap">
            {getLatestArrivals.map((latestArrivalsData) => (
              <div
                className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#101112] shadow-2xl"
                key={latestArrivalsData._id}
              >
                <div className="relative h-[430px] overflow-hidden">
                  <img
                    src={latestArrivalsData.arrivalsCategoryImage?.url}
                    alt={latestArrivalsData.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Category */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] font-medium uppercase tracking-[2px] text-white backdrop-blur-md">
                      {latestArrivalsData.category}
                    </span>
                  </div>

                  {/* Edit / Delete */}
                  <div className="absolute right-5 top-5 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-gray-300 backdrop-blur-md transition hover:bg-white hover:text-black"
                      onClick={() => {
                        console.log("Edit:", latestArrivalsData._id);
                      }}
                    >
                      <FiEdit2 size={16} />
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-gray-300 backdrop-blur-md transition hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        console.log("Delete:", latestArrivalsData._id);
                      }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  {/* Image Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="mb-2 text-[10px] uppercase tracking-[3px] text-white/60">
                      {latestArrivalsData.name}
                    </p>

                    <h2 className="text-3xl font-medium tracking-tight text-white">
                      {latestArrivalsData.category}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm leading-6 text-gray-400">
                    {latestArrivalsData.description}
                  </p>

                  <button className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#191B1E] px-4 py-3.5 text-sm font-medium text-gray-200 transition-all duration-300 hover:bg-white hover:text-black">
                    <span>Explore Collection</span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25272A] text-lg transition-all duration-300 group-hover:bg-black group-hover:text-white">
                      <MdOutlineArrowRightAlt />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {createLatestArrivalsModal && (
        <CreateLatestOverDisplay
          oncloseCreateLatestArrivals={() =>
            setCreateLatestArrivalsModal(false)
          }
        />
      )}
    </div>
  );
};

export default StoreNewArrivals;
