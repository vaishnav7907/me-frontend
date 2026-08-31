import React from "react";
import { IoAdd } from "react-icons/io5";
import BrandList from "../brandlist/BrandList";
const StoreBrands = () => {
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
  return (
    <div className="min-h-screen">
      <div className="py-7 px-7">
        <div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
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
        </div>

        {/* overview of  brands */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-white">
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Total Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">24</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Active Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">18</h2>
          </div>
          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Inactive Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">2</h2>
          </div>

          <div className="rounded-xl border border-[#24272c] bg-[#151719] p-5">
            <p className="text-sm text-gray-500">Brand Products</p>
            <h2 className="mt-2 text-2xl font-semibold">128</h2>
          </div>
        </div>

        <div className="mt-7">
          <BrandList/>
        </div>
      </div>
    </div>
  );
};

export default StoreBrands;
