import React from "react";
import { IoAdd } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { SiHackthebox } from "react-icons/si";
import { FiLayers, FiTrendingUp } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
const StoreProducts = () => {
  const products = [
    {
      name: "All",
      item: 6,
    },
    {
      name: "shirt",
      item: 6,
    },
    {
      name: "t-shirt",
      item: 6,
    },
    {
      name: "pants",
      item: 6,
    },
    {
      name: "jacket",
      item: 6,
    },
    {
      name: "onnerwear",
      item: 6,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="py-7 px-7">
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
              <IoAdd className="text-black" size={20} /> <p>Add Product</p>
            </button>
          </div>

          {/* overview of  products */}
          <div className="grid grid-cols-4 gap-3 pt-10">
            <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
              <div className="flex justify-between items-start w-full ">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                    products
                  </p>

                  <h3 className="text-white text-lg">6</h3>
                  <p className="text-neutral-500 text-xs">total catalog</p>
                </div>
                <SiHackthebox className="text-gray-500" size={20} />
              </div>
            </div>

            <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
              <div className="flex justify-between items-start w-full ">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                    products
                  </p>

                  <h3 className="text-white text-lg">6</h3>
                  <p className="text-neutral-500 text-xs">total catalog</p>
                </div>
                <FiLayers className="text-gray-500" size={20} />
              </div>
            </div>

            <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
              <div className="flex justify-between items-start w-full ">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                    products
                  </p>

                  <h3 className="text-white text-lg">6</h3>
                  <p className="text-neutral-500 text-xs">total catalog</p>
                </div>
                <BiError className="text-orange-500" size={20} />
              </div>
            </div>

            <div className="bg-[#101318] h-[110px] border border-[#242932] rounded-2xl flex gap-3 items-center  px-5">
              <div className="flex justify-between items-start w-full ">
                <div className="flex flex-col gap-1">
                  <p className="uppercase tracking-[0.10em] text-neutral-500 text-[10px] ">
                    products
                  </p>

                  <h3 className="text-white text-lg">6</h3>
                  <p className="text-neutral-500 text-xs">total catalog</p>
                </div>
                <FiTrendingUp className="text-gray-500" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5">
          <div className="flex gap-10 px-3 ">
            {products.map((data, index) => (
              <button
                className="  group
          relative
          flex
          items-center
          gap-2
          whitespace-nowrap
          pb-3
          pt-1"
              >
                <p
                  className="
            text-lg
            font-medium
            text-white
            transition-colors
            group-hover:text-white
          "
                >
                  {data.name}
                </p>

                <p
                  className="
            text-[10px]
            text-gray-500
            transition-colors
            group-hover:text-gray-300
          "
                >
                  {data.item}
                </p>

                <span className="absolute  bottom-0 left-0 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <hr className="mt-0 border-[#242932]" />
        </div>
      </div>
    </div>
  );
};

export default StoreProducts;
