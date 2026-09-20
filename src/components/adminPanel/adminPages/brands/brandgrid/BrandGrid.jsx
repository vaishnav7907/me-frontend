import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsBox } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UseMe } from "../../../../context/Meprovider";
const BrandGrid = () => {
  const {
    setBrandId,
    setUpdateBrandOpen,
    brandDeleteModal,
    setBrandDeleteModal,
    brandDeleteName,
    setBrandDeleteName,
    brandDeleteIcon,
    setBrandDeleteIcon,
  } = UseMe();
  const [getBrands, setGetBrands] = useState([]);
  const getAllBrands = async () => {
    try {
      const getBrandsFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand`,
      );
      setGetBrands(getBrandsFn.data.brand);
      console.log("get all brands", getBrandsFn.data.brand);
    } catch (error) {
      console.log("error in get brands", error);
      console.log("Server response:", error.response?.data);
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 px-3 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getBrands.map((brand) => (
          <div
            key={brand._id}
            className="group rounded-2xl border border-[#252a30] bg-[#0d0f11] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3a4048] hover:bg-[#101214]"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2b3036] bg-white">
                  <img
                    src={brand.brandIcon?.url}
                    alt={brand.brandName}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {brand.brandName}
                  </h4>
                  <div className="mt-2 flex items-center gap-2 text-gray-500">
                    <BsBox size={13} />
                    <span className="text-xs">
                      {brand.productCount} products
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
              >
                <PiDotsThreeVerticalBold size={18} />
              </button>
            </div>
            <div className="my-5 h-px w-full bg-[#24282e]" />
            <div className="flex items-center justify-between">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium ${brand.status === "Active" ? "border-green-400/15 bg-green-400/[0.06] text-green-400" : "border-gray-500/15 bg-gray-500/[0.06] text-gray-500"}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${brand.status === "Active" ? "bg-green-400" : "bg-gray-500"}`}
                />
                {brand.status}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Edit brand"
                  onClick={() => {
                    setBrandId(brand._id);
                    setUpdateBrandOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <MdOutlineModeEditOutline size={17} />
                </button>
                <button
                  type="button"
                  title="Delete brand"
                  onClick={() => {
                    setBrandDeleteName(brand.brandName);
                    setBrandDeleteIcon(brand.brandIcon);
                    setBrandId(brand._id);
                    setBrandDeleteModal(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
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
