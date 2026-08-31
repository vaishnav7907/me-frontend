import React from "react";
import { BsBox } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
const BrandGrid = () => {
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
    <div className="w-full">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  px-3 py-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className=" group rounded-2xl border border-[#252a30] bg-[#0d0f11] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3a4048] hover:bg-[#101214] "
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className=" flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2b3036] bg-white ">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className=" h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 "
                  />
                </div>

                <div className="mt-4">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {brand.name}
                  </h4>
                  <div className="mt-2 flex items-center gap-2 text-gray-500">
                    <BsBox size={13} />
                    <span className="text-xs">{brand.products} products</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className=" flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white "
              >
                <PiDotsThreeVerticalBold size={18} />
              </button>
            </div>

            <div className="my-5 h-px w-full bg-[#24282e]" />

            <div className="flex items-center justify-between">
              <div
                className={` inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium ${brand.status === "Active" ? "border-green-400/15 bg-green-400/[0.06] text-green-400" : "border-gray-500/15 bg-gray-500/[0.06] text-gray-500"} `}
              >
                <span
                  className={` h-1.5 w-1.5 rounded-full ${brand.status === "Active" ? "bg-green-400" : "bg-gray-600"} `}
                />
                {brand.status}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Edit brand"
                  className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white "
                >
                  <MdOutlineModeEditOutline size={17} />
                </button>
                {/* Delete */}
                <button
                  type="button"
                  title="Delete brand"
                  className=" flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400 "
                >
                  <RiDeleteBin6Line size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrandGrid;
